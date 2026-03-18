export default {
  async fetch(request, env) {
    // 1. microCMSのデータ取得先と認証キー
    const MICROCMS_URL = "https://coderoute90.microcms.io/api/v1/blog";
    const API_KEY = "n0P7BLqdjzGt8HJuAPeqNmYHf8Ho44i8nfG1";

    try {
      const response = await fetch(MICROCMS_URL, {
        headers: {
          "X-MICROCMS-API-KEY": API_KEY,
        },
      });

      if (!response.ok) {
        return new Response(`microCMS Error: ${response.status}`, { status: response.status });
      }

      const data = await response.json();

      // 2. ホームページ（CodeRoute 90）からこのデータを使えるように許可を出す（CORS設定）
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // すべてのサイトからのアクセスを許可
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
