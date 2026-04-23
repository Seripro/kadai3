import { App } from '../App';
import { render, screen } from '@testing-library/react';
import { Provider } from '../components/ui/provider';

jest.mock('../utils/supabase.ts', () => {
  return {
    supabase: {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: [
            {
              created_at: '2025/01/01',
              id: '1',
              time: 1,
              title: 'English',
            },
          ],
        }),
      }),
    },
  };
});

describe('title', () => {
  it('should render title', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    const h1 = await screen.findByText('学習記録一覧', {}, { timeout: 3000 });
    expect(h1).toBeInTheDocument();
  });
});
describe('loading', () => {
  it('should render loading', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    const loading = await screen.findByTestId('loading');
    expect(loading).toBeInTheDocument();
  });
});
describe('table', () => {
  it('should render table', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    const title = await screen.findByText('English');
    const time = await screen.findByText('1時間');
    expect(title).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  });
});
