const gallery = $('#gallery');
const gallerySlider = $('#gallery-slider');
const viewMore = $('#view-more');

const FIRST_LOAD = 12;
const LIMIT = 6;
let offset = 0;

let data = {};
let media = {};
let currentSlide = '0';

$.getJSON('./data/media.json', responseData => {
  data = responseData;
  media = data.media;

  renderGallery(loadMore(media, offset, FIRST_LOAD));
});

const imageItem = (imgUrl, likes, comments, id) => `\
  <div class="gallery-item" tabindex="${id}">
    <img src="./${imgUrl}" class="gallery-image" alt="">    
    <div class="gallery-item-info">
      <ul>
        <li class="gallery-item-likes">
          <span class="visually-hidden">Likes:</span>
          <div class="icon heart" aria-hidden="true"></div> ${likes}
        </li>
        <li class="gallery-item-comments">
          <span class="visually-hidden">Comments:</span>
          <div class="icon comment" aria-hidden="true"></div> ${comments}
        </li>
      </ul>
    </div>
  </div>${'\n'}`;

const gallerySliderTemplate = (
    imgUrl, userAvatar, userName, caption, likesCount, location) => `\
  <div class="gallery-slider-container">
    <button class="gallery-close" id="gallery-close">×</button>
    <div class="gallery-slider">
      <div class="gallery-content">
        <div class="gallery-slider-image-wrapper">
          <img src="./${imgUrl}" alt="" class="gallery-slider-image">
        </div>
        <div class="gallery-meta">
          <header class="gallery-meta-header">
            <img src="./${userAvatar}" alt="Main picture" class="user-avatar">
            <div>
              <button class="user-name">${userName}</button><button class="follow">Follow</button>
              <button class="location">${location}</button>
            </div>
          </header>
          <main class="gallery-meta-main">
            ${parseHashTagsAndMentions(caption)}
          </main>
          <footer class="gallery-meta-footer">
            <button class="gallery-meta-likes">${likesCount} likes</button>
            <textarea name="add-comment" class="gallery-add-comment" placeholder="Add a comment..."></textarea>
          </footer>
        </div>
      </div>
      <button class="icon gallery-prev" id="gallery-prev"></button>
      <button class="icon gallery-next" id="gallery-next"></button>
    </div>
  </div>`;

const renderGallery = data => {
  gallery.append(
      data.reduce((buffer, item) => {
        const {
          display_url: imgUrl,
          edge_liked_by: {count: likes},
          edge_media_to_comment: {count: comments},
          id,
        } = item;

        return buffer += imageItem(imgUrl, likes, comments, id);
      }, ''),
  );

  if (offset >= media.length) {
    viewMore.css('display', 'none');
  }
};

const loadMore = (data = media, currentOffset = offset, limit = LIMIT) => {
  offset += limit;

  return data.slice(currentOffset, currentOffset + limit);
};

const parseHashTagsAndMentions = string => string.replace(/(@(\w+))/ig,
    '<a href="https://www.instagram.com/$2">$1</a>').
    replace(/(#(\w+))/ig,
        '<a href="https://www.instagram.com/explore/tags/$2">$1</a>');

const closeGallerySlider = () => gallerySlider.html('');

const nextGallerySlide = () => {
  if (currentSlide !== media[media.length - 1].id) {
    currentSlide = (+currentSlide + 1).toString();

    const {
      display_url: imgUrl,
      edge_media_to_caption: caption,
      edge_liked_by: {count: likesCount},
      location,
      id,
    } = media.find(item => item.id === currentSlide);

    const {username: userName, profile_pic_url: userAvatar} = data;

    gallerySlider.html(
        gallerySliderTemplate(imgUrl, userAvatar, userName, caption, likesCount,
            location),
    );

    togglePrevNextBtns(id);
  }
};

const prevGallerySlide = () => {
  if (currentSlide !== media[0].id) {
    currentSlide = (+currentSlide - 1).toString();

    const {
      display_url: imgUrl,
      edge_media_to_caption: caption,
      edge_liked_by: {count: likesCount},
      location,
      id,
    } = media.find(item => item.id === currentSlide);

    const {username: userName, profile_pic_url: userAvatar} = data;

    gallerySlider.html(
        gallerySliderTemplate(imgUrl, userAvatar, userName, caption, likesCount,
            location),
    );

    togglePrevNextBtns(id);
  }
};

const togglePrevNextBtns = index => {
  const prev = $('#gallery-prev');
  const next = $('#gallery-next');

  if (index === media[0].id) {
    prev.css('visibility', 'hidden');
    next.css('visibility', 'visible');
  } else if (index === media[media.length - 1].id) {
    prev.css('visibility', 'visible');
    next.css('visibility', 'hidden');
  } else {
    prev.css('visibility', 'visible');
    next.css('visibility', 'visible');
  }
};

gallery.on('click', '.gallery-item', event => {
  // "id" value is a string in provided media.json file
  const clickedItemIndex = currentSlide = event.target.parentElement.tabIndex.toString();

  const {
    display_url: imgUrl,
    edge_media_to_caption: caption,
    edge_liked_by: {count: likesCount},
    location,
    id,
  } = media.find(item => item.id === clickedItemIndex);

  const {username: userName, profile_pic_url: userAvatar} = data;

  gallerySlider.html(
      gallerySliderTemplate(imgUrl, userAvatar, userName, caption, likesCount,
          location),
  );

  togglePrevNextBtns(id);
});

gallerySlider.on('click', '#gallery-close', () => closeGallerySlider());
gallerySlider.on('click', '#gallery-prev', () => prevGallerySlide());
gallerySlider.on('click', '#gallery-next', () => nextGallerySlide());

$(document.body).on('keyup', event => {
  // if gallerySlider is opened...
  if (gallerySlider.html()) {
    switch (event.key) {
      case 'ArrowLeft':
        prevGallerySlide();
        break;
      case 'ArrowRight':
        nextGallerySlide();
        break;
      case 'Escape':
        closeGallerySlider();
        break;
      default:
        break;
    }
  }
});

viewMore.on('click', () => {
  renderGallery(loadMore());
});
