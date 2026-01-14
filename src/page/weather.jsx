import { useState, useEffect } from 'react';

function Weather() {
  // 天気データを保存するステート
  const [weatherData, setWeatherData] = useState(null);
  // 読み込み中かどうかを管理するステート
  const [loading, setLoading] = useState(true);
  // エラー情報を保存するステート
  const [error, setError] = useState(null);

  // 画面が最初に表示されたタイミングで1回だけ実行される
  useEffect(() => {
    fetch('https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json')
      .then(response => { 
        // 通信に失敗したらエラーを発生させる
        if (!response.ok) throw new Error('通信エラー');
        // JSON形式に変換
        return response.json();
      })
      .then(data => {
        // 取得したデータの中から今日の天気部分を取り出す
        const todayWeather = data[0].timeSeries[0].areas[0];
        // ステートに保存して画面に反映させる
        setWeatherData(todayWeather);
      })
      .catch(error => {
        // エラーが起きた場合はエラーステートに保存
        setError(error);
      })
      .finally(() => {
        // 成功・失敗に関係なく、読み込み中を終了する
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>天気</h1>

      {/* 読み込み中のときだけ表示 */}
      {loading && <p>読み込み中...</p>}

      {/* エラーがあれば表示 */}
      {error && <p>エラーが発生しました: {error.message}</p>}

      {/* 天気データが取得できたら表示 */}
      {weatherData && (
        <div>
          <h2>{weatherData.area.name}の天気予報</h2>
          {/* 配列になっている天気情報を文字列として整形 */}
          <p>{weatherData.weathers.join(' / ')}</p>
        </div>
      )}
    </>
  );
}

export default Weather;
