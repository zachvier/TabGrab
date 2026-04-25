const assert = require('node:assert/strict');
const test = require('node:test');

const urlMatch = require('../app/javascripts/modules/url_match.js');

test('matches direct Zendesk ticket URLs in ticket-only mode', () => {
  assert.deepEqual(
    urlMatch.extractMatches('https://acme.zendesk.com/tickets/123', 'ticketUrls'),
    { subdomain: 'acme', path: '/tickets/123' }
  );
});

test('matches Zendesk agent ticket URLs in ticket-only mode', () => {
  assert.deepEqual(
    urlMatch.extractMatches('https://acme.zendesk.com/agent/tickets/123', 'ticketUrls'),
    { subdomain: 'acme', path: '/tickets/123' }
  );
});

test('matches non-ticket agent routes only in all-URLs mode', () => {
  assert.deepEqual(
    urlMatch.extractMatches('https://acme.zendesk.com/agent/#/users/456', 'allUrls'),
    { subdomain: 'acme', path: '/users/456' }
  );

  assert.equal(
    urlMatch.extractMatches('https://acme.zendesk.com/agent/#/users/456', 'ticketUrls'),
    null
  );
});

test('does not match restricted Zendesk routes', () => {
  assert.equal(urlMatch.extractMatches('https://acme.zendesk.com/agent/chat', 'allUrls'), null);
  assert.equal(urlMatch.extractMatches('https://acme.zendesk.com/agent/voice', 'allUrls'), null);
  assert.equal(urlMatch.extractMatches('https://acme.zendesk.com/agent/talk', 'allUrls'), null);
  assert.equal(urlMatch.extractMatches('https://acme.zendesk.com/agent/admin/voice', 'allUrls'), null);
  assert.equal(urlMatch.extractMatches('https://acme.zendesk.com/tickets/123/print', 'allUrls'), null);
});

test('rejects non-Zendesk lookalike hosts', () => {
  assert.equal(urlMatch.extractMatches('https://evilzendesk.com/tickets/123', 'allUrls'), null);
  assert.equal(urlMatch.extractMatches('https://acme.zendesk.com.evil.test/tickets/123', 'allUrls'), null);
});

test('accepts only safe in-app routes for page messaging', () => {
  assert.equal(urlMatch.isSafeRoute('/tickets/123'), true);
  assert.equal(urlMatch.isSafeRoute('/users/456'), true);
  assert.equal(urlMatch.isSafeRoute('//evil.test'), false);
  assert.equal(urlMatch.isSafeRoute('https://evil.test'), false);
  assert.equal(urlMatch.isSafeRoute('javascript:alert(1)'), false);
});
