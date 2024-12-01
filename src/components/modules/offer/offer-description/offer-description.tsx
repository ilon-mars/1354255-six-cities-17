import BookmarkButton from '@/components/common/bookmark-button/bookmark-button';

import { BookmarkType } from '@/utils/consts';

const INSIDE_ITEMS = [
  'Wi-Fi',
  'Washing machine',
  'Towels',
  'Heating',
  'Coffee machine',
  'Baby seat',
  'Kitchen',
  'Dishwasher',
  'Cable TV',
  'Fridge'
];

const BOOKMARK_STYLES = {
  type: BookmarkType.Offer,
  width: 31,
  height: 33
};

function OfferDescription(): JSX.Element {
  return (
    <>
      <div className="offer__mark">
        <span>Premium</span>
      </div>

      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          Beautiful &amp; luxurious studio at great location
        </h1>

        <BookmarkButton {...BOOKMARK_STYLES} />
      </div>

      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{ width: '80%' }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">4.8</span>
      </div>

      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          Apartment
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          3 Bedrooms
        </li>
        <li className="offer__feature offer__feature--adults">
          Max 4 adults
        </li>
      </ul>

      <div className="offer__price">
        <b className="offer__price-value">&euro;120</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>

      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {
            INSIDE_ITEMS.map((item) => (
              <li className="offer__inside-item" key={item}>
                {item}
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default OfferDescription;
