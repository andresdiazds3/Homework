type props = {
  img: string;
  title: string;
  lastVisit: string;
  url: string;
};

class Pages {
  img: string;
  title: string;
  lastVisit: string;
  url: string;
  constructor({ img, title, lastVisit, url }: props) {
    this.img = img;
    this.title = title;
    this.lastVisit = lastVisit;
    this.url = url;
  }
}

export default Pages;
