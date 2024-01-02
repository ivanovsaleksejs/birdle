const tweetPopup = (res, success, boxes, tweetlink, state) =>
({
  name: 'popupcontent',
  children: {
    msg: {
      name: 'p',
      props: {
        innerText: text(success ? `right${res.attempt > 5 ? 1 : res.attempt > 3 ? 2 : res.attempt > 1 ? 3 : 4}` : `tweetPopupFailPrefix`, state)
          + "\n" + (success
            ? text(`tweetPopupPrefix`, state) + text(`tweetCWHeader${res.attempt}`, state)
            : text(`defeat`, state)
          ) + "\n\n" + boxes
      }
    },
    link: {
      name: 'a',
      props: {
        href: tweetlink,
        target: '_blank',
        className: 'twitter-share-button',
        innerText: "Tweet"
      }
    }
  }
})

export default tweetPopup
