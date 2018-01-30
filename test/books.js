const test = require('ava');
const request = require('supertest');
const app = require('../src/app');

let jwt;
test.before(async t => {
    const res = await request(app)
      .post('/users/sign-in')
      .field('email', 'admin@example.com')
      .field('password', 'secret');

    t.is(res.status, 200);
    t.not(res.text, '');

    jwt = res.text;
});

test('book:add-then-check-response', async t => {
    const res = await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${jwt}`)
      .field('title', 'test book')
      .field('isbn', '000000000000')
      .field('edition', '1st')
      .field('published', 2018)
      .field('description', 'this is a test book')
      .field('pages', 42)
      .field('publisher', 'self-published')
      .field('authors', [1, 2]);

    const book = res.body;

    t.is(book.title, 'test book');
    t.is(book.isbn, '000000000000');
    t.is(book.edition, '1st');
    t.is(book.published, '2018');
    t.is(book.description, 'this is a test book');
    t.is(book.pages, '42');
    t.is(book.publisher, 'self-published');
});

test('book:add-then-get-check-it-is-same-book', async t => {
    const storedBookRes = await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${jwt}`)
      .field('title', 'test book')
      .field('isbn', '000000000000')
      .field('edition', '1st')
      .field('published', 2018)
      .field('description', 'this is a test book')
      .field('pages', 42)
      .field('publisher', 'self-published')
      .field('authors', [1, 2]);

    const getBookRes = await request(app)
      .get(`/books/${storedBookRes.body.id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    const book = getBookRes.body;

    t.is(book.title, 'test book');
    t.is(book.isbn, '000000000000');
    t.is(book.edition, '1st');
    t.is(book.published, 2018);
    t.is(book.description, 'this is a test book');
    t.is(book.pages, 42);
    t.is(book.publisher, 'self-published');
});

test('book:add-then-delete-check-response', async t => {
    const res = await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${jwt}`)
      .field('title', 'test book')
      .field('isbn', '000000000000')
      .field('edition', '1st')
      .field('published', 2018)
      .field('description', 'this is a test book')
      .field('pages', 42)
      .field('publisher', 'self-published')
      .field('authors', [1, 2]);
    const book = res.body;

    const deleteBookRes = await request(app)
      .delete(`/books/${book.id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    t.is(deleteBookRes.status, 204);
});

test('book:add-then-delete-then-get-check-no-such-book', async t => {
    const res = await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${jwt}`)
      .field('title', 'test book')
      .field('isbn', '000000000000')
      .field('edition', '1st')
      .field('published', 2018)
      .field('description', 'this is a test book')
      .field('pages', 42)
      .field('publisher', 'self-published')
      .field('authors', [1, 2]);
    const book = res.body;

    const deleteBookRes = await request(app)
      .delete(`/books/${book.id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    const getBookRes = await request(app)
      .get(`/books/${book.id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    t.is(deleteBookRes.status, 204);
    t.is(getBookRes.status, 200);
    t.is(getBookRes.body, null);
});


test('books:get-all', async t => {
    const res = await request(app)
      .get('/books')
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    t.is(res.status, 200);
});