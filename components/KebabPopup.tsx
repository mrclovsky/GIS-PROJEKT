// components/KebabPopup.tsx
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Review {
  userLogin: string;
  content: string;
  rating: number;
}

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const login = Cookies.get('login');
    setIsLoggedIn(!!login);

    fetch(`http://localhost:8888/api/v1/review/kebab/${encodeURIComponent(kebab.name)}`)
      .then((res) => res.json())
      .then((data: Review[]) => setReviews(data))
      .catch((err) => console.error('Błąd przy pobieraniu opinii:', err));
  }, [kebab.name]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rating = parseFloat(formData.get('rating') as string);
    const content = formData.get('comment') as string;
    const userLogin = Cookies.get('login');

    if (!userLogin) return alert('Musisz być zalogowany, aby dodać opinię.');

    fetch('http://localhost:8888/api/v1/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        rating,
        kebabName: kebab.name,
        userLogin,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert('Opinia została dodana!');
          e.currentTarget.reset();
          return fetch(`http://localhost:8888/api/v1/review/kebab/${encodeURIComponent(kebab.name)}`);
        } else {
          throw new Error('Błąd przy dodawaniu opinii');
        }
      })
      .then((res) => res.json())
      .then((data: Review[]) => setReviews(data))
      .catch((err) => {
        console.error(err);
        alert('Wystąpił błąd.');
      });

    const popupElement = e.currentTarget.closest('.leaflet-popup');
    if (popupElement) {
      const closeButton = popupElement.querySelector('.leaflet-popup-close-button') as HTMLButtonElement;
      if (closeButton) closeButton.click();
    }
  };

  const toggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.nextElementSibling;
    if (form) form.classList.toggle('hidden');
  };

  return (
    <div className="text-sm space-y-1">
      <h3 className="font-semibold text-base text-center">{kebab.name}</h3>
      <p className="text-center">
        <strong>Adres:</strong> {kebab.address}
      </p>
      <p className="text-center">
        <strong>Otwarcie:</strong> {kebab.hours}
      </p>
      <p className="text-center">
        <strong>Ocena:</strong> {kebab.rating}/5
      </p>

      {isLoggedIn && (
        <div className="text-center">
          <button
            onClick={toggleForm}
            className="mt-1 bg-yellow-500 text-white px-2 py-0.5 text-xs rounded hover:bg-yellow-600"
          >
            Dodaj swoją ocenę
          </button>
          <div className="hidden mt-1">
            <form onSubmit={handleSubmit} className="space-y-1">
              <div>
                <label htmlFor="rating" className="block text-xs font-medium text-gray-700">
                  Ocena (1–5):
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  required
                  className="w-full px-1 py-0.5 border rounded text-xs"
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-xs font-medium text-gray-700">
                  Komentarz:
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={2}
                  required
                  className="w-full px-1 py-0.5 border rounded text-xs"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-2 py-0.5 text-xs rounded hover:bg-yellow-600"
                >
                  Wyślij
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-2">
        <h4 className="font-semibold text-xs text-center">Opinie:</h4>
        {reviews.length > 0 ? (
          <ul className="text-xs space-y-1 mt-1 max-h-40 overflow-auto">
            {reviews.map((review, index) => (
              <li key={index} className="border-t pt-1">
                <strong>{review.userLogin}</strong>: {review.content} <span className="text-yellow-600">({review.rating}/5)</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-xs text-gray-400">Brak opinii</p>
        )}
      </div>
    </div>
  );
};

export default KebabPopup;
