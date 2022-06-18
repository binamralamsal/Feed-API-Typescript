import App from "./app";

import FeedRoute from "./routes/feed.route";
import AuthRoute from "./routes/auth.route";

const app = new App([new FeedRoute(), new AuthRoute()]);

app.listen();
