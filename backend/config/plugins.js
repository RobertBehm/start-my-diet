module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "moneymangrill@gmail.com",
      defaultTo: "moneymangrill@gmail.com",
    },
  },
});
