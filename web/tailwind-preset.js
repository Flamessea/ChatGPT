module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        body: "rgba(52,53,65,1)",
        sidebar: "rgba(32,33,35,1)",
        "gray-50": "rgba(68,70,84,1)",
        "gray-700": "rgba(64,65,79,1",
        "gray-800": "rgba(52,53,65,1)",
        ai: "rgb(25, 195, 125)",
      },
      backgroundImage: {
        footer: "linear-gradient(180deg,rgba(53,55,64,0),#353740 58.85%)",
      },
      animation: {
        cursor: "cursor 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        cursor: {
          "0%, 100%": { opacity: 0 },
          "20%": { opacity: 1 },
        },
      },
    },
  },
};
