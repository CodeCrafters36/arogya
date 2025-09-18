// import { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     const addScript = document.createElement("script");
//     addScript.src =
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     document.body.appendChild(addScript);

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en", // default site language
//           includedLanguages:"en,hi,gu,ta,te,bn,ml,mr", // apni requirement ke hisaab se languages
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         "google_translate_element"
//       );
//     };
//   }, []);

//   return (
//     <div id="google_translate_element"/>
//     //   id="google_translate_element"
//     //   className="text-sm border rounded px-2 py-1 bg-white shadow"
//     // />


//   );
// };

// export default GoogleTranslate;


import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,gu,ta,te,bn,ml,mr",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Clean up extra branding/styles
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-logo-link, .goog-te-gadget span {
        display: none !important;
      }
      .goog-te-gadget {
        font-size: 0 !important;
      }
      .goog-te-combo {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 9999px;
        padding: 4px 8px;
        font-size: 0.75rem;
        color: #333;
        outline: none;
        cursor: pointer;
      }
      .goog-te-combo:hover {
        border-color: #999;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      id="google_translate_element"
      className="flex items-center px-2 py-1 rounded-full shadow bg-white text-xs"
    />
  );
};

export default GoogleTranslate;
