import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import DictionaryVersionFooter from './DictionaryVersionFooter';

const renderFooter = (enabled = true) =>
  render(
    <>
      <footer>
        <div>
          <div>
            <div data-testid="footer-layout" />
          </div>
        </div>
      </footer>
      <DictionaryVersionFooter enabled={enabled} />
    </>,
  );

describe('DictionaryVersionFooter', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the dictionary version returned by the settings endpoint', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ _dict_version: '2.4.0' }), {
        status: 200,
      }),
    );

    renderFooter();

    expect(
      await screen.findByText('Data Dictionary Version: 2.4.0'),
    ).not.toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v0/submission/_dictionary/_settings',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('renders nothing when the feature is disabled', async () => {
    const fetchMock = jest.spyOn(global, 'fetch');

    renderFooter(false);

    await waitFor(() => expect(fetchMock).not.toHaveBeenCalled());
    expect(screen.queryByText(/Data Dictionary Version/)).toBeNull();
  });

  it('renders nothing when the endpoint does not return a version', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 200,
      }),
    );

    renderFooter();

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/v0/submission/_dictionary/_settings',
        expect.any(Object),
      ),
    );
    expect(screen.queryByText(/Data Dictionary Version/)).toBeNull();
  });
});
