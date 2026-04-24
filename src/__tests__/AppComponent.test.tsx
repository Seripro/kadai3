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
  it('should render modal title', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    const button = await screen.findByText('記録を追加');
    fireEvent.click(button);
    const title = await screen.findByText('学習記録を追加');
    expect(title).toBeInTheDocument();
  });
  it('add a record', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    // 記録を追加ボタンを押し、モーダルを開く
    const button = await screen.findByText('記録を追加');
    fireEvent.click(button);

    // 入力欄、登録ボタンを取得
    const inputTitle = await screen.findByPlaceholderText('英語');
    const inputTime = await screen.findByPlaceholderText('3');
    const addButton = await screen.findByText('登録');

    // 内容を入力し、登録ボタンをクリック
    fireEvent.change(inputTitle, { target: { value: 'Math' } });
    fireEvent.change(inputTime, { target: { value: '1' } });
    fireEvent.click(addButton);

    // 追加した記録が表示されることを確認
    const title = await screen.findByText('Math');
    const times = await screen.findAllByText('1時間');
    expect(title).toBeInTheDocument();
    expect(times).toHaveLength(2);
  });
  it('raise title error', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    // 記録を追加ボタンを押し、モーダルを開く
    const button = await screen.findByText('記録を追加');
    fireEvent.click(button);

    // 入力欄、登録ボタンを取得
    const inputTime = await screen.findByPlaceholderText('3');
    const addButton = await screen.findByText('登録');

    // 学習時間を入力し、登録ボタンをクリック
    fireEvent.change(inputTime, { target: { value: '1' } });
    fireEvent.click(addButton);

    // 学習内容のエラーメッセージが表示されることを確認
    const titleError = await screen.findByText('学習内容を入力してください');
    expect(titleError).toBeInTheDocument();
  });
  it('raise title error', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    // 記録を追加ボタンを押し、モーダルを開く
    const button = await screen.findByText('記録を追加');
    fireEvent.click(button);

    // 入力欄、登録ボタンを取得
    const inputTitle = await screen.findByPlaceholderText('英語');
    const addButton = await screen.findByText('登録');

    // 学習内容を入力し、登録ボタンをクリック
    fireEvent.change(inputTitle, { target: { value: '数学' } });
    fireEvent.click(addButton);

    // 学習内容のエラーメッセージが表示されることを確認
    const timeError = await screen.findByText('正しい学習時間を入力してください');
    expect(timeError).toBeInTheDocument();
  });
  it('raise title error and time error', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    // 記録を追加ボタンを押し、モーダルを開く
    const button = await screen.findByText('記録を追加');
    fireEvent.click(button);

    // 登録ボタンを取得
    const addButton = await screen.findByText('登録');

    // 登録ボタンをクリック
    fireEvent.click(addButton);

    // 学習内容、学習時間のエラーメッセージが表示されることを確認
    const titleAndTimeError = await screen.findByText((content) => {
      return content.includes('学習内容を入力してください') && content.includes('正しい学習時間を入力してください');
    });
    expect(titleAndTimeError).toBeInTheDocument();
  });
});
