import { Identity } from "./output";

const actor = new Identity();

actor.lookup("10015").then((value) => {
  value.forEach((deviceData) => {
    console.log(deviceData.alias);
  });
});
