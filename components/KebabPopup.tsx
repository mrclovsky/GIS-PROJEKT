// components/KebabPopup.tsx
import React from 'react';

type Kebab = {
  name: string;
  address: string;
  hours: string;
  rating: number;
};

type KebabPopupProps = {
  kebab: Kebab;
};

const KebabPopup: React.FC<KebabPopupProps> = ({ kebab }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const popupElement = e.currentTarget.closest('.leaflet-popup');
    if (popupElement) {
      const closeButton = popupElement.querySelector(
        '.leaflet-popup-close-button'
      ) as HTMLButtonElement;
      if (closeButton) closeButton.click();
    }
  };

  const toggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.nextElementSibling;
    if (form) form.classList.toggle('hidden');
  };

  return (
    <div>
      <h3 className="font-bold text-lg text-center">{kebab.name}</h3>
      <p className="text-center">
        <strong>Adres:</strong> {kebab.address}
      </p>
      <p className="text-center">
        <strong>Godziny otwarcia:</strong> {kebab.hours}
      </p>
      <p className="text-center">
        <strong>Ocena:</strong> {kebab.rating}/5
      </p>

      <div className="text-center">
        <button
          onClick={toggleForm}
          className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Dodaj swoją ocenę
        </button>
        <div className="hidden mt-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Ocena (1-5):
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                required
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Komentarz:
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={2}
                required
                className="w-full px-2 py-1 border rounded"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Wyślij
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KebabPopup;
