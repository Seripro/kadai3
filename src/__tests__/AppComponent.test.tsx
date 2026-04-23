import { App } from '../App';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from '../components/ui/provider';

let mockRecords: {
  created_at: string;
  id: string;
  time: number;
  title: string;
}[] = [];

jest.mock('../utils/supabase.ts', () => {
  return {
    supabase: {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockImplementation(async () => ({
          data: mockRecords,
          error: null,
        })),
        insert: jest.fn().mockImplementation(async (record: { title: string; time: number }) => {
          mockRecords = [
            ...mockRecords,
            {
              created_at: '2025/01/01',
              id: String(mockRecords.length + 1),
              time: record.time,
              title: record.title,
            },
          ];
          return {
            data: null,
            error: null,
          };
        }),
      }),
    },
  };
});

beforeEach(() => {
  mockRecords = [
    {
      created_at: '2025/01/01',
      id: '1',
      time: 1,
      title: 'English',
    },
  ];
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
describe('new record', () => {
  it('should render new record button', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    const button = await screen.findByText('記録を追加');
    expect(button).toBeInTheDocument();
  });
  it('add a record', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    const button = await screen.findByText('記録を追加');
    fireEvent.click(button);
    const inputTitle = await screen.findByPlaceholderText('英語');
    const inputTime = await screen.findByPlaceholderText('3');
    const addButton = await screen.findByText('登録');
    fireEvent.change(inputTitle, { target: { value: 'Math' } });
    fireEvent.change(inputTime, { target: { value: '1' } });
    fireEvent.click(addButton);
    const title = await screen.findByText('Math');
    const times = await screen.findAllByText('1時間');
    expect(title).toBeInTheDocument();
    expect(times).toHaveLength(2);
  });
});
