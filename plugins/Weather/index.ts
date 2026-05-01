import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";

const { sendBotMessage } = findByProps("sendBotMessage");

let unregister: (() => void) | undefined;

export default {
  onLoad() {
    unregister = registerCommand({
      name: "weather",
      displayName: "weather",
      description: "Get the current weather for a city",
      displayDescription: "Get the current weather for a city",
      type: 1,
      inputType: 1,
      options: [
        {
          name: "city",
          displayName: "city",
          description: "The city to get weather for",
          displayDescription: "The city to get weather for",
          type: 3,
          required: true,
        },
      ],
      execute: async (args: any[], ctx: any) => {
        const city = args.find((a) => a.name === "city")?.value;
        if (!city) return;

        try {
          const res = await fetch(
            `https://wttr.in/${encodeURIComponent(city)}?format=j1`
          );
          const data = await res.json();
          const current = data.current_condition[0];
          const area = data.nearest_area[0];

          const name = area.areaName[0].value;
          const country = area.country[0].value;
          const temp_c = current.temp_C;
          const temp_f = current.temp_F;
          const feels_c = current.FeelsLikeC;
          const feels_f = current.FeelsLikeF;
          const humidity = current.humidity;
          const wind_kmph = current.windspeedKmph;
          const desc = current.weatherDesc[0].value;

          sendBotMessage(
            ctx.channel.id,
            `🌤️ **Weather in ${name}, ${country}**\n\n` +
            `**${desc}**\n` +
            `🌡️ Temp: ${temp_c}°C / ${temp_f}°F\n` +
            `🤔 Feels like: ${feels_c}°C / ${feels_f}°F\n` +
            `💧 Humidity: ${humidity}%\n` +
            `💨 Wind: ${wind_kmph} km/h`
          );
        } catch (e) {
          sendBotMessage(ctx.channel.id, "❌ Could not find weather for that city. Try again!");
        }
      },
    });
  },

  onUnload() {
    unregister?.();
  },
};
