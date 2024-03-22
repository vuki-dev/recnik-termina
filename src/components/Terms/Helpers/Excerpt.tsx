export default function Excerpt({text, maxLength}: {text: string, maxLength: number}) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };

  const excerptedText = truncateText(text, maxLength);

  return <p>{excerptedText}</p>;
}
