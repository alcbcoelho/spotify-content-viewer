import { toPng } from 'html-to-image';
import { MdDownload } from 'react-icons/md';

type Props = {
  id: string;
  elementToPrintId: string;
  elementToFilterOutId: string;
  fileName: string;
};

export default function DownloadButton({
  id,
  elementToPrintId,
  elementToFilterOutId,
  fileName
}: Props) {
  const handleClick = async () => {
    const filter = (element: HTMLElement): boolean => {
      return !element.id || element.id !== elementToFilterOutId;
    };

    try {
      const elementToPrint = document.getElementById(elementToPrintId);

      if (!elementToPrint)
        throw new Error('Could not locate element to convert into image');

      const imgUrl = await toPng(elementToPrint, { filter });
      const link = document.createElement('a');
      link.href = imgUrl;
      link.download = fileName;
      link.click();
    } catch (e) {
      console.error('Error generating image: ' + e);
    }
  };

  return (
    <button id={id} title="Download in PNG format" onClick={handleClick}>
      <MdDownload />
    </button>
  );
}

// export default DownloadButton;
