import Pages from "../classes/Pages";
import logoGithub from "../img/logoGithub.png"
import logoGoogle from "../img/logoGoogle.png"
import logoYoutube from "../img/logoYoutube.png"
import logoStack from "../img/logoStackOverflow.jpeg"
import logoWiki from "../img/logoWikipedia.jpeg"

export const BrowserHistory = [
  new Pages({
    img: logoGoogle,
    title: "Google",
    lastVisit: "Hoy, 8:30 PM",
    url: "https://www.google.com"
  }),
  new Pages({
    img: logoYoutube,
    title: "YouTube",
    lastVisit: "Hoy, 7:10 PM",
    url: "https://www.youtube.com"
  }),
  new Pages({
    img: logoGithub,
    title: "GitHub",
    lastVisit: "Ayer, 10:45 PM",
    url: "https://github.com"
  }),
  new Pages({
    img: logoStack,
    title: "Stack Overflow",
    lastVisit: "Ayer, 9:20 PM",
    url: "https://stackoverflow.com"
  }),
  new Pages({
    img: logoWiki,
    title: "Wikipedia",
    lastVisit: "Hace 2 días",
    url: "https://wikipedia.org"
  })
];