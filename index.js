import React from "react";
import { AppRegistry } from "react-native";
import App from "./example/example";
import App2 from "./example/example2";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App2);
