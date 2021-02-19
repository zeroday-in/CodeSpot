function initNotifications() {
  fetchNotificationsCount(),
    markNotificationsAsRead(),
    initReactions(),
    listenForNotificationsBellClick(),
    initFilter(),
    initPagination(),
    initLoadMoreButton();
}
function markNotificationsAsRead() {
  setTimeout(function () {
    if (document.getElementById("notifications-container")) {
      var e,
        t = window.location.pathname.split("/"),
        n = parseInt(t[t.length - 1].replace(/[^0-9]/g, ""), 10);
      (e = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject(
            "Microsoft.XMLHTTP"
          )).onreadystatechange = function () {};
      var a = document.querySelector("meta[name='csrf-token']").content;
      Number.isInteger(n)
        ? e.open("Post", "/notifications/reads?org_id=" + n, !0)
        : e.open("Post", "/notifications/reads", !0),
        e.setRequestHeader("X-CSRF-Token", a),
        e.send();
    }
  }, 450);
}
function fetchNotificationsCount() {
  null == document.getElementById("notifications-container") &&
    checkUserLoggedIn() &&
    instantClick &&
    (InstantClick.removeExpiredKeys("force"),
    setTimeout(function () {
      InstantClick.preload(
        document.getElementById("notifications-link").href,
        "force"
      );
    }, 30));
}
function initReactions() {
  setTimeout(function () {
    if (document.getElementById("notifications-container")) {
      for (
        var e = document.getElementsByClassName("reaction-button"), t = 0;
        t < e.length;
        t++
      ) {
        e[t].onclick = function (e) {
          function t(e) {
            "create" === e.result
              ? n.classList.add("reacted")
              : n.classList.remove("reacted");
          }
          e.preventDefault(), sendHapticMessage("medium");
          var n = this;
          n.classList.add("reacted");
          var a = new FormData();
          a.append("reactable_type", n.dataset.reactableType),
            a.append("category", n.dataset.category),
            a.append("reactable_id", n.dataset.reactableId),
            getCsrfToken()
              .then(sendFetch("reaction-creation", a))
              .then(function (e) {
                200 === e.status && e.json().then(t);
              });
        };
      }
      e = document.getElementsByClassName("toggle-reply-form");
      for (let t = 0; t < e.length; t++) {
        e[t].onclick = function (e) {
          e.preventDefault();
          var t = this;
          document
            .getElementById("comment-form-for-" + t.dataset.reactableId)
            .classList.remove("hidden"),
            t.classList.add("hidden"),
            t.classList.remove("inline-flex"),
            setTimeout(function () {
              document
                .getElementById("comment-textarea-for-" + t.dataset.reactableId)
                .focus();
            }, 30);
        };
      }
    }
  }, 180);
}
function listenForNotificationsBellClick() {
  var e = document.getElementById("notifications-link");
  e &&
    setTimeout(function () {
      e.onclick = function () {
        document.getElementById("notifications-number").classList.add("hidden");
      };
    }, 180);
}
function initFilter() {
  const e = document.getElementById("notifications-filter__select"),
    t = (e) => {
      window.location.href = e.target.value;
    };
  e && e.addEventListener("change", t);
}
function initPagination() {
  const e = document.getElementsByClassName("notifications-paginator");
  if (e && e.length > 0) {
    const t = e[e.length - 1];
    t &&
      window
        .fetch(t.dataset.paginationPath, {
          method: "GET",
          credentials: "same-origin",
        })
        .then(function (e) {
          200 === e.status &&
            e.text().then(function (e) {
              const n = e.trim();
              if (n) {
                const e = document.getElementById("articles-list"),
                  a = document.createElement("div");
                (a.innerHTML = n), t.remove(), e.append(a), initReactions();
              } else {
                const e = document.getElementById("load-more-button");
                e && (e.style.display = "none"), t.remove();
              }
            });
        });
  }
}
function initLoadMoreButton() {
  const e = document.getElementById("load-more-button");
  e && e.addEventListener("click", initPagination);
}
function fetchNext(e, t, n) {
  var a = JSON.parse(e.dataset.params),
    o = Object.keys(a)
      .map(function (e) {
        return encodeURIComponent(e) + "=" + encodeURIComponent(a[e]);
      })
      .join("&");
  if (!(o.indexOf("q=") > -1)) {
    var i = (
      t +
      "?page=" +
      nextPage +
      "&" +
      o +
      "&signature=" +
      parseInt(Date.now() / 4e5, 10)
    ).replace("&&", "&");
    window
      .fetch(i)
      .then(function (e) {
        e.json().then(function (e) {
          (nextPage += 1),
            n(e),
            0 === e.length &&
              ((document.getElementById("loading-articles").style.display =
                "none"),
              (done = !0));
        });
      })
      ["catch"](function (e) {
        console.log(e);
      });
  }
}
function insertNext(e, t) {
  return function (n) {
    document.getElementById(e.listId || "sublist");
    var a = "";
    n.forEach(function (n) {
      if (!document.getElementById((e.elId || "element") + "-" + n.id)) {
        var o = t(n);
        a += o;
      }
    }),
      document
        .getElementById("following-wrapper")
        .insertAdjacentHTML("beforeend", a),
      nextPage > 0 && (fetching = !1);
  };
}
function buildFollowsHTML(e) {
  return (
    '<div class="crayons-card p-4 m:p-6 flex s:grid single-article" id="follows-' +
    e.id +
    '"><a href="' +
    e.path +
    '" class="crayons-avatar crayons-avatar--2xl s:mb-2 s:mx-auto"><img alt="@' +
    e.username +
    ' profile image" class="crayons-avatar__image" src="' +
    e.profile_image +
    '" /></a><div class="pl-4 s:pl-0 self-center"><h3 class="s:mb-1 p-0"><a href="' +
    e.path +
    '">' +
    e.name +
    '</a></h3><p class="s:mb-4"><a href="' +
    e.path +
    '" class="crayons-link crayons-link--secondary">@' +
    e.username +
    "</a></p></div></div>"
  );
}
function buildTagsHTML(e) {
  var t = "";
  return (
    e.points < 0 &&
      (t =
        '<span class="crayons-indicator crayons-indicator--critical crayons-indicator--outlined" title="This tag has negative follow weight">Anti-follow</span>'),
    '<div class="crayons-card p-4 m:p-6 flex flex-col single-article" id="follows-' +
      e.id +
      '" style="border: 1px solid ' +
      e.color +
      "; box-shadow: 3px 3px 0" +
      e.color +
      '"><h3 class="s:mb-1 p-0 fw-medium"><a href="/t/' +
      e.name +
      '" class="crayons-tag crayons-tag--l"><span class="crayons-tag__prefix">#</span>' +
      e.name +
      "</a>" +
      t +
      '</h3><p class="grid-cell__summary truncate-at-3"></p><form class="edit_follow flex items-center flex-nowrap mb-4" id="edit_follow_' +
      e.id +
      '" action="/follows/' +
      e.id +
      '" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="\u2713"><input type="hidden" name="_method" value="patch"><input type="hidden" name="authenticity_token" value="' +
      e.token +
      '"><label for="follow_points" class="fs-s flex-1 pr-2 color-base-60 align-right whitespace-nowrap">Follow weight:</label><input step="any" class="crayons-textfield flex-1 fs-s" required="required" type="number" style="max-width:90px" value="' +
      e.points +
      '" name="follow[points]" id="follow_points"><button type="submit" class="crayons-btn crayons-btn--ghost crayons-btn--s" name="commit">Save</button></form></div>'
  );
}
function fetchNextFollowingPage(e) {
  var t = JSON.parse(e.dataset.params).action;
  t.includes("users")
    ? fetchNext(
        e,
        "/followings/users",
        insertNext({ elId: "follows" }, buildFollowsHTML)
      )
    : t.includes("podcasts")
    ? fetchNext(
        e,
        "/followings/podcasts",
        insertNext({ elId: "follows" }, buildFollowsHTML)
      )
    : t.includes("organizations")
    ? fetchNext(
        e,
        "/followings/organizations",
        insertNext({ elId: "follows" }, buildFollowsHTML)
      )
    : fetchNext(
        e,
        "/followings/tags",
        insertNext({ elId: "follows" }, buildTagsHTML)
      );
}
function fetchNextFollowersPage(e) {
  fetchNext(
    e,
    "/api/followers/users",
    insertNext({ elId: "follows" }, buildFollowsHTML)
  );
}
function buildVideoArticleHTML(e) {
  return (
    '<a class="single-video-article single-article" href="' +
    e.path +
    '" id="video-article-' +
    e.id +
    '">\n  <div class="video-image" style="background-image: url(' +
    e.cloudinary_video_url +
    ')">\n     <span class="video-timestamp">' +
    e.video_duration_in_minutes +
    "</span>\n   </div>\n   <p><strong>" +
    e.title +
    "</strong></p>\n  <p>" +
    e.user.name +
    "</p>\n</a>"
  );
}
function insertVideos(e) {
  document.getElementById("subvideos");
  var t = "";
  e.forEach(function (e) {
    if (!document.getElementById("video-article-" + e.id)) {
      var n = buildVideoArticleHTML(e);
      t += n;
    }
  });
  document.documentElement.scrollHeight, document.body.scrollTop;
  var n = document.createElement("div");
  (n.innerHTML = t), (n.className += "video-collection");
  var a = document.querySelectorAll(".single-article, .crayons-story");
  insertAfter(n, a[a.length - 1]), nextPage > 0 && (fetching = !1);
}
function fetchNextVideoPage(e) {
  fetchNext(e, "/api/videos", insertVideos);
}
function insertArticles(e) {
  document.getElementById("substories");
  var t = "",
    n = document.getElementById("home-articles-object");
  n && (n.outerHTML = ""),
    e.forEach(function (e) {
      var n = document.getElementById("article-link-" + e.id);
      if (
        ![
          "/",
          "/top/week",
          "/top/month",
          "/top/year",
          "/top/infinity",
          "/latest",
        ].includes(window.location.pathname) &&
        n &&
        n.parentElement &&
        n.parentElement.classList.contains("crayons-story") &&
        !document.getElementById("video-player-" + e.id)
      )
        n.parentElement.outerHTML = buildArticleHTML(e);
      else if (!n) {
        var a = buildArticleHTML(e);
        (t += a), initializeReadingListIcons();
      }
    });
  document.documentElement.scrollHeight, document.body.scrollTop;
  var a = document.createElement("div");
  a.classList.add("paged-stories"),
    (a.innerHTML = t),
    a.addEventListener("click", (e) => {
      const { classList: t } = e.target;
      if (
        t.contains("crayons-story") ||
        t.contains("crayons-story__top") ||
        t.contains("crayons-story__body") ||
        t.contains("crayons-story__indention") ||
        t.contains("crayons-story__title") ||
        t.contains("crayons-story__tags") ||
        t.contains("crayons-story__bottom")
      ) {
        let t = e.target,
          { articlePath: n } = t.dataset;
        for (; !n; ) (n = t.dataset.articlePath), (t = t.parentElement);
        InstantClick.preload(n), InstantClick.display(n);
      }
    });
  var o = document.querySelectorAll(".single-article, .crayons-story");
  insertAfter(a, o[o.length - 1]), nextPage > 0 && (fetching = !1);
}
function fetchNextPodcastPage(e) {
  fetchNext(e, "/api/podcast_episodes", insertArticles);
}
function paginate(e, t, n) {
  const a = { ...{ per_page: 15, page: nextPage }, ...JSON.parse(t) };
  e && e.length > 0 && ((a.tag_names = a.tag_names || []), a.tag_names.push(e)),
    (a.approved = "true" === n ? "true" : "");
  var o = document.getElementById("index-container");
  "base-feed" === o.dataset.feed
    ? (a.class_name = "Article")
    : "latest" === o.dataset.feed
    ? ((a.class_name = "Article"), (a.sort_by = "published_at"))
    : ((a.class_name = "Article"),
      (a["published_at[gte]"] = o.dataset.articlesSince),
      (a.sort_by = "public_reactions_count"));
  const i = new URLSearchParams();
  Object.keys(a).forEach((e) => {
    const t = a[e];
    Array.isArray(t)
      ? t.forEach((t) => {
          i.append(`${e}[]`, t);
        })
      : i.append(e, t);
  }),
    fetch(`/search/feed_content?${i.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-CSRF-Token": window.csrfToken,
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((e) => e.json())
      .then((e) => {
        (nextPage += 1), insertArticles(e.result);
        const t = new CustomEvent("checkBlockedContent");
        window.dispatchEvent(t),
          initializeReadingListIcons(),
          0 === e.result.length &&
            ((document.getElementById("loading-articles").style.display =
              "none"),
            (done = !0));
      });
}
function fetchNextPageIfNearBottom() {
  var e = document.getElementById("index-container");
  if (e && !document.getElementById("query-wrapper")) {
    var t,
      n,
      a = e.dataset.which;
    "podcast-episodes" === a
      ? ((n = "articles-list"),
        (t = function () {
          fetchNextPodcastPage(e);
        }))
      : "videos" === a
      ? ((n = "video-collection"),
        (t = function () {
          fetchNextVideoPage(e);
        }))
      : "followers" === a
      ? ((n = "user-dashboard"),
        (t = function () {
          fetchNextFollowersPage(e);
        }))
      : "following" === a
      ? ((n = "user-dashboard"),
        (t = function () {
          fetchNextFollowingPage(e);
        }))
      : ((n = "articles-list"),
        (t = function () {
          paginate(e.dataset.tag, e.dataset.params, e.dataset.requiresApproval);
        }));
    var o = document.getElementById(n);
    !done &&
      !fetching &&
      window.scrollY > o.scrollHeight - 3700 &&
      ((fetching = !0), t());
  }
}
function checkIfNearBottomOfPage() {
  (document.getElementsByClassName("crayons-story").length < 2 &&
    document.getElementsByClassName("single-article").length < 2) ||
  window.location.search.indexOf("q=") > -1
    ? ((document.getElementById("loading-articles").style.display = "none"),
      (done = !0))
    : (document.getElementById("loading-articles").style.display = "block"),
    fetchNextPageIfNearBottom(),
    setInterval(function () {
      fetchNextPageIfNearBottom();
    }, 210);
}
function initScrolling() {
  document.getElementById("index-container") &&
    ((initScrolling.called = !0), checkIfNearBottomOfPage());
}
function showChatModal(e) {
  (e.style.display = "block"), document.getElementById("new-message").focus();
}
function hideChatModal(e) {
  e.style.display = "none";
}
function toggleModal() {
  document.querySelector(".crayons-modal").classList.toggle("hidden");
}
function initModal() {
  var e = document.querySelector(".crayons-modal");
  e.querySelector(".close-modal").addEventListener("click", toggleModal),
    e
      .querySelector(".crayons-modal__overlay")
      .addEventListener("click", toggleModal);
}
function handleChatButtonPress(e) {
  var t = document.getElementById("new-message").value,
    n = JSON.parse(e.dataset.info),
    a = new FormData();
  0 !== t.replace(/\s/g, "").length &&
    (a.append("user_id", n.id),
    a.append("message", t),
    a.append("controller", "chat_channels"),
    getCsrfToken()
      .then(sendFetch("chat-creation", a))
      .then(() => {
        window.location.href = `/connect/@${n.username}`;
      }));
}
function addButtonClickHandle(e, t, n) {
  var a = document.getElementById("user-connect-redirect"),
    o = document.getElementById("new-message-form");
  t.classList.add("showing"),
    "open" === n.showChat && "mutual" !== e
      ? (a.removeAttribute("href"),
        t.addEventListener("click", toggleModal),
        t.classList.remove("hidden"),
        a.classList.remove("hidden"),
        (o.onsubmit = () => (handleChatButtonPress(o), !1)))
      : "mutual" === e &&
        (t.removeEventListener("click", toggleModal),
        t.classList.remove("hidden"),
        a.classList.remove("hidden"));
}
function fetchButton(e, t) {
  var n;
  ((n = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange = () => {
    n.readyState === XMLHttpRequest.DONE &&
      200 === n.status &&
      addButtonClickHandle(n.response, e, t);
  }),
    n.open("GET", "/follows/" + t.id + "?followable_type=" + t.className),
    n.send();
}
function initializeChatButton(e, t) {
  var n = userData();
  null !== n && n.id !== t.id && fetchButton(e, t);
}
function initializeAllChatButtons() {
  var e,
    t = document.getElementsByClassName("chat-action-button"),
    n = document.getElementById("new-message-form");
  if (n) {
    var a = JSON.parse(n.dataset.info);
    for (initModal(), e = 0; e < t.length; e += 1)
      initializeChatButton(t[e], a);
  }
}
function initializeAllFollowButts() {
  for (
    var e = document.getElementsByClassName("follow-action-button"), t = 0;
    t < e.length;
    t++
  )
    e[t].className.includes("follow-user") || initializeFollowButt(e[t]);
}
function fetchUserFollowStatuses(e) {
  const t = new URL("/follows/bulk_show", document.location),
    n = new URLSearchParams();
  Object.keys(e).forEach((e) => {
    n.append("ids[]", e);
  }),
    n.append("followable_type", "User"),
    (t.search = n),
    fetch(t, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-CSRF-Token": window.csrfToken,
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((e) => e.json())
      .then((t) => {
        Object.keys(t).forEach(function (n) {
          addButtClickHandle(t[n], e[n]);
        });
      });
}
function initializeUserFollowButtons(e) {
  if (e.length > 0) {
    for (var t = {}, n = 0; n < e.length; n++) {
      if ("logged-out" === document.body.getAttribute("data-user-status"))
        addModalEventListener(e[n]);
      else t[JSON.parse(e[n].dataset.info).id] = e[n];
    }
    Object.keys(t).length > 0 && fetchUserFollowStatuses(t);
  }
}
function initializeUserFollowButts() {
  initializeUserFollowButtons(
    document.getElementsByClassName("follow-action-button follow-user")
  );
}
function initializeFollowButt(e) {
  var t = userData(),
    n = JSON.parse(e.dataset.info);
  "logged-out" !==
  document.getElementsByTagName("body")[0].getAttribute("data-user-status")
    ? "Tag" === n.className && t
      ? handleTagButtAssignment(t, e, n)
      : "fetched" !== e.dataset.fetched && fetchButt(e, n)
    : addModalEventListener(e);
}
function addModalEventListener(e) {
  assignState(e, "login"),
    (e.onclick = function (e) {
      e.preventDefault(), showModal("follow-button");
    });
}
function fetchButt(e, t) {
  var n;
  (e.dataset.fetched = "fetched"),
    ((n = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject(
          "Microsoft.XMLHTTP"
        )).onreadystatechange = function () {
      n.readyState === XMLHttpRequest.DONE &&
        200 === n.status &&
        addButtClickHandle(n.response, e);
    }),
    n.open("GET", "/follows/" + t.id + "?followable_type=" + t.className, !0),
    n.send();
}
function addButtClickHandle(e, t) {
  JSON.parse(t.dataset.info);
  assignInitialButtResponse(e, t),
    (t.onclick = function (e) {
      e.preventDefault(), handleOptimisticButtRender(t);
    });
}
function handleTagButtAssignment(e, t, n) {
  addButtClickHandle(
    -1 !==
      JSON.parse(e.followed_tags)
        .map(function (e) {
          return e.id;
        })
        .indexOf(n.id)
      ? "true"
      : "false",
    t
  );
}
function assignInitialButtResponse(e, t) {
  t.classList.add("showing"),
    assignState(
      t,
      "true" === e || "mutual" === e
        ? "unfollow"
        : "follow-back" === e
        ? "follow-back"
        : "false" === e
        ? "follow"
        : "self" === e
        ? "self"
        : "login"
    );
}
function handleOptimisticButtRender(e) {
  if ("self" === e.dataset.verb) window.location.href = "/settings";
  else if ("login" === e.dataset.verb) showModal("follow-button");
  else {
    try {
      var t = JSON.parse(e.dataset.info).id,
        n = e.dataset.verb;
      document.querySelectorAll(".follow-action-button").forEach(function (e) {
        try {
          if (e.dataset.info) {
            var a = JSON.parse(e.dataset.info).id;
            a && a === t && assignState(e, n);
          }
        } catch (o) {
          return;
        }
      });
    } catch (a) {
      return;
    }
    handleFollowButtPress(e);
  }
}
function handleFollowButtPress(e) {
  var t = JSON.parse(e.dataset.info),
    n = new FormData();
  n.append("followable_type", t.className),
    n.append("followable_id", t.id),
    n.append("verb", e.dataset.verb),
    getCsrfToken().then(sendFetch("follow-creation", n));
}
function assignState(e, t) {
  var n = JSON.parse(e.dataset.info).style,
    a = JSON.parse(e.dataset.info).followStyle;
  e.classList.add("showing"),
    "follow" === t || "follow-back" === t
      ? ((e.dataset.verb = "unfollow"),
        e.classList.remove("crayons-btn--outlined"),
        "primary" === a
          ? e.classList.add("crayons-btn--primary")
          : "secondary" === a && e.classList.add("crayons-btn--secondary"),
        "follow-back" === t
          ? addFollowText(e, t)
          : "follow" === t && addFollowText(e, n))
      : "login" === t
      ? addFollowText(e, n)
      : "self" === t
      ? ((e.dataset.verb = "self"), (e.textContent = "Edit profile"))
      : ((e.dataset.verb = "follow"),
        addFollowingText(e, n),
        e.classList.remove("crayons-btn--primary"),
        e.classList.remove("crayons-btn--secondary"),
        e.classList.add("crayons-btn--outlined"));
}
function addFollowText(e, t) {
  e.textContent =
    "small" === t ? "+" : "follow-back" === t ? "Follow back" : "Follow";
}
function addFollowingText(e, t) {
  e.textContent = "small" === t ? "\u2713" : "Following";
}
function initializeAllTagEditButtons() {
  var e = document.getElementById("tag-edit-button"),
    t = document.getElementById("tag-admin-button"),
    n = userData();
  n.admin &&
    t &&
    ((t.style.display = "inline-block"),
    (document.getElementById("tag-admin-button").style.display =
      "inline-block")),
    n &&
      e &&
      (n.moderator_for_tags.indexOf(e.dataset.tag) > -1 || n.admin) &&
      ((e.style.display = "inline-block"),
      (document.getElementById("tag-mod-button").style.display =
        "inline-block"));
}
function archivedPosts() {
  return document.getElementsByClassName("story-archived");
}
function showArchivedPosts() {
  for (var e = archivedPosts(), t = 0; t < e.length; t += 1)
    e[t].classList.remove("hidden");
}
function hideArchivedPosts() {
  for (var e = archivedPosts(), t = 0; t < e.length; t += 1)
    e[t].classList.add("hidden");
}
function toggleArchivedPosts(e) {
  e.preventDefault();
  var t = e.target;
  t.innerHTML.match(/Show/)
    ? ((t.innerHTML = "Hide archived"), showArchivedPosts())
    : ((t.innerHTML = "Show archived"), hideArchivedPosts());
}
function initializeArchivedPostFilter() {
  var e = document.getElementById("toggleArchivedLink");
  e && e.addEventListener("click", toggleArchivedPosts);
}
function initializeArticleDate() {
  addLocalizedDateTimeToElementsTitles(
    document.querySelectorAll(
      ".crayons-story time, article time, .single-other-article time"
    ),
    "datetime"
  );
}
function setReactionCount(e, t) {
  var n = document.getElementById("reaction-butt-" + e).classList,
    a = document.getElementById("reaction-number-" + e);
  t > 0
    ? (n.add("activated"), (a.textContent = t))
    : (n.remove("activated"), (a.textContent = "0"));
}
function showUserReaction(e, t) {
  const n = document.getElementById("reaction-butt-" + e);
  n.classList.add("user-activated", t), n.setAttribute("aria-checked", "true");
}
function hideUserReaction(e) {
  const t = document.getElementById("reaction-butt-" + e);
  t.classList.remove("user-activated", "user-animated"),
    t.setAttribute("aria-checked", "false");
}
function hasUserReacted(e) {
  return document
    .getElementById("reaction-butt-" + e)
    .classList.contains("user-activated");
}
function getNumReactions(e) {
  const t = document.getElementById("reaction-number-" + e);
  return t && "" !== t.textContent ? parseInt(t.textContent, 10) : 0;
}
function reactToArticle(e, t) {
  function n() {
    var e = getNumReactions(t);
    hasUserReacted(t)
      ? (hideUserReaction(t), setReactionCount(t, e - 1))
      : (showUserReaction(t, "user-animated"), setReactionCount(t, e + 1));
  }
  function a() {
    var n = new FormData();
    return (
      n.append("reactable_type", "Article"),
      n.append("reactable_id", e),
      n.append("category", t),
      n
    );
  }
  var o = document.body.getAttribute("data-user-status");
  sendHapticMessage("medium"),
    "logged-out" !== o
      ? (n(),
        (document.getElementById("reaction-butt-" + t).disabled = !0),
        getCsrfToken()
          .then(sendFetch("reaction-creation", a()))
          .then((e) =>
            200 === e.status
              ? e.json().then(() => {
                  document.getElementById("reaction-butt-" + t).disabled = !1;
                })
              : (n(),
                (document.getElementById("reaction-butt-" + t).disabled = !1),
                undefined)
          )
          ["catch"](() => {
            n(), (document.getElementById("reaction-butt-" + t).disabled = !1);
          }))
      : showModal("react-to-article");
}
function setCollectionFunctionality() {
  if (document.getElementById("collection-link-inbetween"))
    for (
      var e = document.getElementsByClassName(
          "series-switcher__link--inbetween"
        ),
        t = e.length,
        n = 0;
      n < e.length;
      n += 1
    )
      e[n].onclick = (n) => {
        n.preventDefault();
        for (
          var a = document.getElementsByClassName(
              "series-switcher__link--hidden"
            ),
            o = a.length,
            i = 0;
          i < o;
          i += 1
        )
          a[0].classList.remove("series-switcher__link--hidden");
        for (var r = 0; r < t; r += 1)
          e[0].className = "series-switcher__link--hidden";
      };
}
function requestReactionCounts(e) {
  var t;
  ((t = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange = () => {
    if (t.readyState === XMLHttpRequest.DONE) {
      var e = JSON.parse(t.response);
      e.article_reaction_counts.forEach((e) => {
        setReactionCount(e.category, e.count);
      }),
        e.reactions.forEach((e) => {
          document.getElementById("reaction-butt-" + e.category) &&
            showUserReaction(e.category, "not-user-animated");
        });
    }
  }),
    t.open("GET", "/reactions?article_id=" + e, !0),
    t.send();
}
function initializeArticleReactions() {
  setCollectionFunctionality(),
    setTimeout(() => {
      var e = document.getElementsByClassName("crayons-reaction");
      if (document.getElementById("article-body") && e.length > 0) {
        var t = document.getElementById("article-body").dataset.articleId;
        requestReactionCounts(t);
        for (var n = 0; n < e.length; n += 1)
          e[n].onclick = function () {
            reactToArticle(t, this.dataset.category);
          };
      }
    }, 3);
}
function initializeBaseTracking() {
  var e = 0,
    t = !1,
    n = document.body.dataset.gaTracking,
    a = setInterval(function () {
      var o, i, r, s, c, l, d;
      t ||
        ((o = window),
        (i = document),
        (r = "script"),
        (s = "//www.google-analytics.com/analytics.js"),
        (c = "ga"),
        (o.GoogleAnalyticsObject = c),
        (o[c] =
          o[c] ||
          function () {
            (o[c].q = o[c].q || []).push(arguments);
          }),
        (o[c].l = 1 * new Date()),
        (l = i.createElement(r)),
        (d = i.getElementsByTagName(r)[0]),
        (l.async = 1),
        (l.src = s),
        d.parentNode.insertBefore(l, d)),
        (t = !0),
        e++,
        window.ga &&
          ga.create &&
          (ga("create", n, "auto"),
          ga("set", "anonymizeIp", !0),
          ga("send", "pageview", location.pathname + location.search),
          clearInterval(a)),
        e > 85 && (clearInterval(a), fallbackActivityRecording());
    }, 25);
  eventListening(), trackCustomImpressions();
}
function fallbackActivityRecording() {
  var e = document.querySelector("meta[name='csrf-token']");
  if (e) {
    var t = e.getAttribute("content"),
      n = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      ),
      a = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      ),
      o = window.screen.availWidth,
      i = window.screen.availHeight,
      r = {
        path: location.pathname + location.search,
        user_language: navigator.language,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        viewport_size: a + "x" + n,
        screen_resolution: i + "x" + o,
        document_title: document.title,
        document_encoding: document.characterSet,
        document_path: location.pathname + location.search,
      };
    window.fetch("/fallback_activity_recorder", {
      method: "POST",
      headers: { Accept: "application/json", "X-CSRF-Token": t },
      body: JSON.stringify(r),
      credentials: "same-origin",
    });
  }
}
function eventListening() {
  var e = document.getElementById("cta-comment-register-now-link");
  e &&
    (e.onclick = function () {
      ga("send", "event", "click", "register-now-click", null, null);
    });
}
function trackCustomImpressions() {
  setTimeout(function () {
    var e =
        document.getElementById("article-body") ||
        document.getElementById("comment-article-indicator"),
      t = document.querySelector("meta[name='csrf-token']"),
      n = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(
        navigator.userAgent
      ),
      a = window.innerWidth > 1250,
      o = document.getElementById("article-show-primary-sticky-nav"),
      i = document.getElementById("html-variant-article-show-sidebar");
    if (i && e && t && !n && a) {
      var r = {
          html_variant_id: i.dataset.variantId,
          article_id: e.dataset.articleId,
        },
        s = t.getAttribute("content");
      trackHTMLVariantTrial(r, s);
      for (var c = o.querySelectorAll("a,button"), l = 0; l < c.length; l++)
        c[l].addEventListener("click", function () {
          trackHtmlVariantSuccess(r, s);
        });
    }
    var d = document.getElementById("html-variant-article-show-below-article");
    if (d && e && t && !n && a) {
      (r = {
        html_variant_id: d.dataset.variantId,
        article_id: e.dataset.articleId,
      }),
        (s = t.getAttribute("content"));
      trackHTMLVariantTrial(r, s);
      for (c = d.querySelectorAll("a,button"), l = 0; l < c.length; l++)
        c[l].addEventListener("click", function () {
          trackHtmlVariantSuccess(r, s);
        });
    }
    if (e && t && !n) {
      var u = Math.floor(10 * Math.random());
      if (!checkUserLoggedIn() && 1 != u) return;
      (r = {
        article_id: e.dataset.articleId,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
      }),
        (s = t.getAttribute("content"));
      trackPageView(r, s);
      var m = 0,
        f = setInterval(function () {
          m++;
          var e =
            document.getElementById("article-body") ||
            document.getElementById("comment-article-indicator");
          e && checkUserLoggedIn()
            ? trackFifteenSecondsOnPage(e.dataset.articleId, s)
            : clearInterval(f),
            m > 118 && clearInterval(f);
        }, 15e3);
    }
    var g = document.getElementById("sponsorship-arbitrary-display-widget");
    g &&
      t &&
      !n &&
      a &&
      checkUserLoggedIn() &&
      (trackAdImpression((s = t.getAttribute("content")), g),
      g.removeEventListener("click", trackAdClick, !1),
      g.addEventListener("click", function () {
        trackAdClick(s, g);
      }));
  }, 1800);
}
function trackHTMLVariantTrial(e, t) {
  1 === Math.floor(10 * Math.random()) &&
    window.fetch("/html_variant_trials", {
      method: "POST",
      headers: { "X-CSRF-Token": t, "Content-Type": "application/json" },
      body: JSON.stringify(e),
      credentials: "same-origin",
    });
}
function trackHtmlVariantSuccess(e, t) {
  window.fetch("/html_variant_successes", {
    method: "POST",
    headers: { "X-CSRF-Token": t, "Content-Type": "application/json" },
    body: JSON.stringify(e),
    credentials: "same-origin",
  });
}
function trackPageView(e, t) {
  window.fetch("/page_views", {
    method: "POST",
    headers: { "X-CSRF-Token": t, "Content-Type": "application/json" },
    body: JSON.stringify(e),
    credentials: "same-origin",
  });
}
function trackFifteenSecondsOnPage(e, t) {
  window.fetch("/page_views/" + e, {
    method: "PATCH",
    headers: { "X-CSRF-Token": t, "Content-Type": "application/json" },
    credentials: "same-origin",
  });
}
function trackAdImpression(e, t) {
  var n = {
    display_ad_event: {
      display_ad_id: t.dataset.id,
      context_type: "home",
      category: "impression",
    },
  };
  window.fetch("/display_ad_events", {
    method: "POST",
    headers: { "X-CSRF-Token": e, "Content-Type": "application/json" },
    body: JSON.stringify(n),
    credentials: "same-origin",
  });
}
function trackAdClick(e, t) {
  if (!adClicked) {
    var n = {
      display_ad_event: {
        display_ad_id: t.dataset.id,
        context_type: "home",
        category: "click",
      },
    };
    window.fetch("/display_ad_events", {
      method: "POST",
      headers: { "X-CSRF-Token": e, "Content-Type": "application/json" },
      body: JSON.stringify(n),
      credentials: "same-origin",
    });
  }
  adClicked = !0;
}
function initializeUserProfileContent(e) {
  (document.getElementById("sidebar-profile--avatar").src = e.profile_image_90),
    (document.getElementById("sidebar-profile--avatar").alt = e.username),
    (document.getElementById("sidebar-profile--name").innerHTML = filterXSS(
      e.name
    )),
    (document.getElementById("sidebar-profile--username").innerHTML =
      "@" + e.username),
    (document.getElementById("sidebar-profile").href = "/" + e.username);
}
function initializeProfileImage(e) {
  document.getElementById("comment-primary-user-profile--avatar") &&
    (document.getElementById("comment-primary-user-profile--avatar").src =
      e.profile_image_90);
}
function initializeUserSidebar(e) {
  document.getElementById("sidebar-nav") && initializeUserProfileContent(e);
}
function addRelevantButtonsToArticle(e) {
  var t = document.getElementById("article-show-container");
  if (t && parseInt(t.dataset.authorId, 10) === e.id) {
    let n = [
      `<a class="crayons-btn crayons-btn--s crayons-btn--secondary" href="${t.dataset.path}/edit" rel="nofollow">Edit</a>`,
    ];
    !0 === JSON.parse(t.dataset.published) &&
      n.push(
        `<a class="crayons-btn crayons-btn--s crayons-btn--secondary ml-1" href="${t.dataset.path}/manage" rel="nofollow">Manage</a>`
      ),
      e.pro &&
        n.push(
          `<a class="crayons-btn crayons-btn--s crayons-btn--secondary ml-1" href="${t.dataset.path}/stats" rel="nofollow">Stats</a>`
        ),
      (document.getElementById("action-space").innerHTML = n.join(""));
  }
}
function addRelevantButtonsToComments(e) {
  if (document.getElementById("comments-container")) {
    var t = document.getElementsByClassName("comment-actions");
    for (let n = 0; n < t.length; n += 1) {
      let a = t[n];
      const { action: o, commentableUserId: i, userId: r } = a.dataset;
      parseInt(r, 10) === e.id &&
        "settings-button" === o &&
        ((a.innerHTML =
          '<a href="' +
          a.dataset.path +
          '" rel="nofollow" class="crayons-link crayons-link--block" data-no-instant>Settings</a>'),
        a.classList.remove("hidden"),
        a.classList.add("block")),
        "hide-button" === o &&
          parseInt(i, 10) === e.id &&
          (a.classList.remove("hidden"), a.classList.add("block"));
    }
    if (e.trusted) {
      var n = document.getElementsByClassName("mod-actions");
      for (let e = 0; e < n.length; e += 1) {
        let t = n[e];
        t.classList.contains("mod-actions-comment-button") &&
          (t.innerHTML =
            '<a href="' +
            t.dataset.path +
            '" rel="nofollow" class="crayons-link crayons-link--block">Moderate</a>'),
          (t.className = "mod-actions"),
          t.classList.remove("hidden"),
          t.classList.add("block");
      }
    }
  }
}
function setCurrentUserToNavBar(e) {
  const t = document.getElementById("first-nav-link");
  (t.href = `/${e.username}`),
    (t.querySelector("span").textContent = e.name),
    (t.querySelector("small").textContent = `@${e.username}`),
    (document.getElementById("nav-profile-image").src = e.profile_image_90),
    e.admin &&
      document
        .querySelector(".js-header-menu-admin-link")
        .classList.remove("hidden");
}
function initializeBaseUserData() {
  const e = userData();
  setCurrentUserToNavBar(e),
    initializeUserSidebar(e),
    initializeProfileImage(e),
    addRelevantButtonsToArticle(e),
    addRelevantButtonsToComments(e);
}
function removeExistingCSRF() {
  var e = document.querySelector("meta[name='csrf-token']"),
    t = document.querySelector("meta[name='csrf-param']");
  e && t && (e.parentNode.removeChild(e), t.parentNode.removeChild(t));
}
function fetchBaseData() {
  var e;
  ((e = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange = () => {
    if (e.readyState === XMLHttpRequest.DONE) {
      var t = JSON.parse(e.responseText);
      t.token && removeExistingCSRF();
      var n = document.createElement("meta");
      (n.name = "csrf-param"),
        (n.content = t.param),
        document.head.appendChild(n);
      var a = document.createElement("meta");
      (a.name = "csrf-token"),
        (a.content = t.token),
        document.head.appendChild(a),
        (document.body.dataset.loaded = "true"),
        t.broadcast && (document.body.dataset.broadcast = t.broadcast),
        checkUserLoggedIn() &&
          ((document.body.dataset.user = t.user),
          browserStoreCache("set", t.user),
          setTimeout(() => {
            "function" == typeof ga &&
              ga("set", "userId", JSON.parse(t.user).id);
          }, 400));
    }
  }),
    e.open("GET", "/async_info/base_data", !0),
    e.send();
}
function initializeBodyData() {
  fetchBaseData();
}
function broadcastData() {
  const { broadcast: e = null } = document.body.dataset;
  return JSON.parse(e);
}
function camelizedBroadcastKey(e) {
  return `${e.replace(/\W+(.)/g, (e, t) => t.toUpperCase())}Seen`;
}
function addCloseButtonClickHandle(e) {
  document.getElementsByClassName(
    "close-announcement-button"
  )[0].onclick = () => {
    localStorage.setItem(camelizedBroadcastKey(e), !0),
      document.getElementById("active-broadcast").remove();
  };
}
function renderBroadcast(e, t) {
  const { banner_class: n, html: a, title: o } = t;
  if (n) {
    const [t, a] = n.split(" ");
    a ? e.classList.add(t, a) : e.classList.add(t);
  }
  const i =
    '<button class="close-announcement-button crayons-btn crayons-btn--icon-rounded crayons-btn--inverted crayons-btn--ghost">\n    <svg class="crayons-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z" /></svg>\n  </button>';
  e.insertAdjacentHTML(
    "afterbegin",
    `<div class='broadcast-data'>${a}</div>${i}`
  ),
    addCloseButtonClickHandle(o),
    e.classList.add("broadcast-visible");
}
function initializeBroadcast() {
  const e = window.location.pathname.match(/^(?:\/connect|\/new)/);
  if (window.frameElement || e) {
    const e = document.getElementById("active-broadcast");
    return void (e && e.classList.remove("broadcast-visible"));
  }
  const t = userData(),
    n = broadcastData();
  if (t && !t.display_announcements) return;
  if (!n) return;
  const { title: a } = n;
  if (!0 === JSON.parse(localStorage.getItem(camelizedBroadcastKey(a)))) return;
  const o = document.getElementById("active-broadcast");
  o.firstElementChild
    ? o.classList.contains("broadcast-visible") ||
      o.classList.toggle("broadcast-visible")
    : renderBroadcast(o, n);
}
function initializeCommentDate() {
  addLocalizedDateTimeToElementsTitles(
    document.querySelectorAll(".comment-date time"),
    "datetime"
  );
}
function initializeCommentDropdown() {
  function e(e) {
    return (t) => t.classList.remove(e);
  }
  function t(e) {
    return Array.from(document.getElementsByClassName(e));
  }
  function n() {
    const { activeElement: e } = document,
      t =
        "clipboard-copy" === e.localName
          ? e.querySelector("input")
          : document.getElementById("article-copy-link-input");
    t.focus(), t.setSelectionRange(0, t.value.length), (f.hidden = !1);
  }
  function a() {
    f && (f.hidden = !0);
  }
  function o() {
    const e = document.getElementById("article-copy-link-input").value;
    Runtime.copyToClipboard(e).then(() => {
      n();
    });
  }
  function i(e) {
    return !(
      e.target.matches(".dropdown-icon") ||
      e.target.matches(".dropbtn") ||
      e.target.matches("clipboard-copy") ||
      document.getElementById("article-copy-icon").contains(e.target) ||
      e.target.parentElement.classList.contains("dropdown-link-row")
    );
  }
  function r() {
    document.removeEventListener("click", l);
  }
  function s() {
    const e = document.getElementsByTagName("clipboard-copy")[0];
    e && e.removeEventListener("click", o);
  }
  function c() {
    t("crayons-dropdown").forEach(e("block"));
  }
  function l(e) {
    i(e) && (c(), a(), r());
  }
  function d(e) {
    const t = e.currentTarget,
      n = t.parentElement.getElementsByClassName("crayons-dropdown")[0];
    if (n)
      if (
        "article-show-more-button" === t.id &&
        Runtime.isNativeAndroid("shareText")
      )
        AndroidBridge.shareText(location.href);
      else if (
        (u(n.querySelector(".report-abuse-link-wrapper")),
        n.classList.contains("block"))
      )
        n.classList.remove("block"), r(), s(), a();
      else {
        c(), n.classList.add("block");
        const e = document.getElementsByTagName("clipboard-copy")[0];
        document.addEventListener("click", l),
          e && e.addEventListener("click", o);
      }
  }
  function u(e) {
    e &&
      (e.innerHTML = `<a href="${e.dataset.path}" class="crayons-link crayons-link--block">Report Abuse</a>`);
  }
  function m(e) {
    e.getAttribute("has-dropdown-listener") ||
      (e.addEventListener("click", d),
      e.setAttribute("has-dropdown-listener", "true"));
  }
  const f = document.getElementById("article-copy-link-announcer");
  setTimeout(function () {
    t("dropbtn").forEach(m);
  }, 100);
}
function getAndShowPreview(e, t) {
  function n(t) {
    (e.innerHTML = t.processed_html), activateRunkitTags();
  }
  const a = JSON.stringify({ comment: { body_markdown: t.value } });
  getCsrfToken()
    .then(sendFetch("comment-preview", a))
    .then((e) => e.json())
    .then(n)
    ["catch"]((e) => {
      console.log("error!"), console.log(e);
    });
}
function handleCommentPreview(e) {
  e.preventDefault();
  const { form: t } = e.target,
    n = t.querySelector(".comment-textarea"),
    a = t.querySelector(".comment-form__preview"),
    o = t.querySelector(".preview-toggle");
  if ("" !== n.value)
    if (t.classList.contains("preview-open"))
      t.classList.toggle("preview-open"), (o.innerHTML = "Preview");
    else {
      getAndShowPreview(a, n);
      const e = n.offsetHeight + 43;
      (a.style.minHeight = `${e}px`),
        (o.innerHTML = "Continue editing"),
        t.classList.toggle("preview-open");
    }
}
function initializeCommentPreview() {
  const e = document.querySelector(".preview-toggle");
  e && e.addEventListener("click", handleCommentPreview);
}
function initializeCommentsPage() {
  if (document.getElementById("comments-container")) {
    toggleCodeOfConduct();
    var e = document.getElementById("comments-container").dataset.commentableId,
      t = document.getElementById("comments-container").dataset.commentableType;
    commentableIdList = e.split(",");
    (function () {
      for (var e = 0; e < commentableIdList.length; e++)
        !(function (e) {
          var n;
          ((n = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject(
                "Microsoft.XMLHTTP"
              )).onreadystatechange = function () {
            if (n.readyState === XMLHttpRequest.DONE) {
              for (
                var e = JSON.parse(n.response),
                  t = e.reactions,
                  a = document.getElementsByClassName("single-comment-node"),
                  o = e.public_reaction_counts,
                  i = 0;
                i < t.length;
                i++
              ) {
                (r = document.getElementById(
                  "button-for-comment-" + t[i].reactable_id
                )) && r.classList.add("reacted");
              }
              for (i = 0; i < o.length; i++) {
                var r;
                (r = document.getElementById(
                  "button-for-comment-" + o[i].id
                )) &&
                  o[i].count > 0 &&
                  (document.getElementById("reactions-count-" + o[i].id)
                    ? (document.getElementById(
                        "reactions-count-" + o[i].id
                      ).innerHTML = o[i].count)
                    : (r.innerHTML =
                        r.innerHTML +
                        "<span class='reactions-count' id='reactions-count-" +
                        o[i].id +
                        "'>" +
                        o[i].count +
                        "</span>"));
              }
              for (i = 0; i < a.length; i++)
                if (a[i].dataset.commentAuthorId == e.current_user.id) {
                  a[i].dataset.currentUserComment = "true";
                  var s = a[i].children[0].children[2].children[0],
                    c = document.getElementById(
                      "button-for-comment-" + a[i].dataset.commentId
                    );
                  s &&
                    c &&
                    ((s.className = "current-user-actions"),
                    (s.innerHTML =
                      '<a data-no-instant href="' +
                      s.parentNode.dataset.path +
                      '/delete_confirm" class="edit-butt">Delete</a>                                                <a href="' +
                      s.parentNode.dataset.path +
                      '/edit">Edit</a>'),
                    (s.style.display = "inline-block"),
                    document
                      .getElementById(
                        "button-for-comment-" + a[i].dataset.commentId
                      )
                      .classList.add("reacted"));
                }
            }
          }),
            n.open(
              "GET",
              "/reactions?commentable_id=" +
                commentableIdList[e] +
                "&commentable_type=" +
                t,
              !0
            ),
            n.send();
        })(e);
    })();
    for (
      var n = document.getElementsByClassName("reaction-button"), a = 0;
      a < n.length;
      a++
    ) {
      n[a].onclick = function (e) {
        function t(e) {
          var t = n.children[2];
          "create" === e.result
            ? (n.classList.add("reacted"),
              t && (t.innerHTML = parseInt(t.innerHTML) + 1))
            : (n.classList.remove("reacted"),
              t && (t.innerHTML = parseInt(t.innerHTML) - 1));
        }
        var n = this;
        if (
          (e.preventDefault(),
          sendHapticMessage("medium"),
          "logged-out" !== document.body.getAttribute("data-user-status"))
        ) {
          n.classList.add("reacted"), (n.disabled = !0);
          var a = new FormData();
          a.append("reactable_type", "Comment"),
            a.append("reactable_id", n.dataset.commentId),
            getCsrfToken()
              .then(sendFetch("reaction-creation", a))
              .then(function (e) {
                (n.disabled = !1), 200 === e.status && e.json().then(t);
              });
        } else showModal("react-to-comment");
      };
    }
    var o = document.getElementsByClassName("toggle-reply-form");
    for (a = 0; a < o.length; a++) {
      o[a].onclick = function (n) {
        if (
          (n.preventDefault(), n.target.classList.contains("thread-indication"))
        )
          return !1;
        if ("logged-out" != document.body.getAttribute("data-user-status")) {
          var a = n.target.parentNode.dataset.commentId,
            o = setInterval(function () {
              document.querySelector("meta[name='csrf-token']") &&
                (clearInterval(o),
                (commentWrapper = n.target.closest(".inner-comment")),
                commentWrapper.classList.add("replying"),
                (commentWrapper.innerHTML += buildCommentFormHTML(e, t, a)),
                initializeCommentsPage(),
                setTimeout(function () {
                  commentWrapper.getElementsByTagName("textarea")[0].focus();
                }, 30));
            }, 1);
          return !1;
        }
        showModal("reply-to-comment");
      };
    }
    var i = document.getElementsByClassName("edit-butt");
    for (a = 0; a < i.length; a++) {
      i[a].onclick = function () {};
    }
    document.getElementById("new_comment") &&
      document
        .getElementById("new_comment")
        .addEventListener("submit", handleCommentSubmit);
  }
  listenForDetailsToggle();
}
function toggleCodeOfConduct() {
  var e = userData();
  if (e) {
    var t = e.checked_code_of_conduct,
      n = document.getElementById("toggle-code-of-conduct-checkbox");
    n &&
      !t &&
      (n.innerHTML =
        '<input type="checkbox" name="checked_code_of_conduct" class="checkbox" required/>                                  <label for="checked_code_of_conduct">I\'ve read the <a href="/code-of-conduct">code of conduct</a></label>');
  }
}
function replaceActionButts(e) {
  var t = "",
    n = e.getElementsByClassName("actions")[0];
  "true" == e.dataset.currentUserComment &&
    (t =
      '<a data-no-instant href="' +
      e.parentNode.parentNode.dataset.path +
      '/delete_confirm" class="edit-butt">Delete</a>                            <a href="' +
      e.parentNode.parentNode.dataset.path +
      '/edit">Edit</a>'),
    (n.innerHTML =
      '<span class="current-user-actions">' +
      t +
      '</span><a href="#" class="toggle-reply-form">Reply</a>');
}
function handleCommentSubmit(e) {
  e.preventDefault();
  var t = e.target;
  t.classList.add("submitting");
  var n = t.getElementsByClassName("comment-textarea")[0];
  n && ((n.style.height = null), n.blur());
  var a = document.getElementById("comment-node-" + e.target.dataset.commentId),
    o = JSON.stringify({
      comment: {
        body_markdown: t.getElementsByTagName("textarea")[0].value,
        commentable_id: t.querySelector("#comment_commentable_id").value,
        commentable_type: t.querySelector("#comment_commentable_type").value,
        parent_id: t.querySelector("#comment_parent_id")
          ? t.querySelector("#comment_parent_id").value
          : null,
      },
    });
  return (
    getCsrfToken()
      .then(sendFetch("comment-creation", o))
      .then(function (n) {
        return (
          200 === n.status
            ? n.json().then(function (n) {
                var o = document.createElement("div");
                o.innerHTML = buildCommentHTML(n);
                var i = document.body,
                  r = JSON.parse(i.getAttribute("data-user"));
                (r.checked_code_of_conduct = !0),
                  (i.dataset.user = JSON.stringify(r));
                var s = t.getElementsByClassName("code-of-conduct")[0];
                s && (s.innerHTML = "");
                var c = document.getElementById("new_comment");
                if (a) {
                  handleFormClose(e),
                    n.depth > 2 &&
                      (a.getElementsByClassName(
                        "toggle-reply-form"
                      )[0].innerHTML = "");
                  var l = a.getElementsByClassName("inner-comment")[0];
                  l.parentNode.insertBefore(o, l.nextSibling);
                } else if (c) {
                  (c = document.getElementById("new_comment")).classList.remove(
                    "submitting"
                  );
                  const e = t.querySelector(".comment-textarea");
                  e
                    .closest(".comment-form")
                    .classList.remove("comment-form--initiated"),
                    (e.value = n.comment_template || "");
                  var d = document.getElementById("preview-div");
                  d.classList.add("preview-toggle"), (d.innerHTML = "");
                  var u = document.getElementById("comment-trees-container");
                  u.insertBefore(o, u.firstChild);
                } else if (document.getElementById("notifications-container")) {
                  var m = document.createElement("span");
                  (m.innerHTML =
                    '<div class="crayons-notice align-center p-2 m-2 crayons-notice--success reply-sent-notice reply-sent-notice">Reply sent \u2014 <a href="' +
                    n.url +
                    '">Check it out</a></div>'),
                    t.replaceWith(m);
                } else window.location.replace(n.url);
                initializeCommentsPage(),
                  initializeCommentDate(),
                  initializeCommentDropdown(),
                  activateRunkitTags();
              })
            : n.json().then(function () {
                return (
                  t.classList.remove("submitting"),
                  showRateLimitModal(
                    "made a comment",
                    "making another comment"
                  ),
                  !1
                );
              }),
          !1
        );
      }),
    !1
  );
}
function handleFocus(e) {
  handleButtonsActivation(e);
  var t = document.body.getAttribute("data-user-status"),
    n = e.target;
  "logged-out" == t
    ? (e.preventDefault(),
      showModal("reply-to-comment"),
      n.blur(),
      setTimeout(function () {
        n.blur(), showModal("reply-to-comment");
      }, 100))
    : (e.target
        .closest(".comment-form")
        .classList.add("comment-form--initiated"),
      handleSizeChange(e));
}
function handleKeyUp(e) {
  handleSizeChange(e), handleButtonsActivation(e);
}
function handleSubmit(e) {
  var t = userData();
  t &&
    t.checked_code_of_conduct &&
    "" !== e.target.value.trim() &&
    e.target.closest("form").querySelector('button[type="submit"]').click();
}
function handleBoldAndItalic(e) {
  var t = e.target,
    n = t.value.substring(t.selectionStart, t.selectionEnd),
    a = t.selectionStart,
    o = e.keyCode === KEY_CODE_B ? "**" : "_";
  replaceSelectedText(t, `${o}${n}${o}`);
  var i = a + o.length;
  t.setSelectionRange(i, i + n.length);
}
function handleLink(e) {
  var t = e.target,
    n = t.value.substring(t.selectionStart, t.selectionEnd),
    a = t.selectionStart;
  replaceSelectedText(t, `[${n}](url)`);
  var o = a + n.length + 3,
    i = o + 3;
  t.setSelectionRange(o, i);
}
function replaceSelectedText(e, t) {
  document.execCommand("insertText", !1, t) ||
    ("function" == typeof e.setRangeText && e.setRangeText(t));
}
function handleKeyDown(e) {
  if (e.ctrlKey || e.metaKey)
    switch (e.keyCode) {
      case KEY_CODE_B:
      case KEY_CODE_I:
        e.preventDefault(), handleBoldAndItalic(e);
        break;
      case KEY_CODE_K:
        e.preventDefault(), handleLink(e);
        break;
      case ENTER_KEY_CODE:
        e.preventDefault(), handleSubmit(e);
    }
}
function handleFormClose(e) {
  e.target.closest(".inner-comment").classList.remove("replying"),
    e.target.closest(".comment-form").remove(),
    initializeCommentsPage();
}
function handleSizeChange(e) {
  var t = e.target,
    n = parseInt(t.style.height.replace("px", ""));
  t.style.height = t.scrollHeight + (t.scrollHeight > n ? 15 : 0) + "px";
}
function handleButtonsActivation(e) {
  var t = e.target;
  t.closest(".comment-form")
    .querySelectorAll(".js-btn-enable")
    .forEach(function (e) {
      t.value.length > 0 ? (e.disabled = !1) : (e.disabled = !0);
    });
}
function validateField(e) {
  var t = e.target.closest(".comment-form").querySelector(".comment-textarea");
  t && "" == t.value && e.preventDefault();
}
function handleChange(e) {
  handleButtonsActivation(e);
}
function generateUploadFormdata(e) {
  var t = document.querySelector("meta[name='csrf-token']").content,
    n = new FormData();
  return n.append("authenticity_token", t), n.append("image", e[0]), n;
}
function handleImageUpload(e, t) {
  document.getElementById("comments-container").dataset.commentableId;
  e.preventDefault(),
    document.getElementById("image-upload-" + t).click(),
    (document.getElementById("image-upload-" + t).onchange = function () {
      document.getElementById("image-upload-" + t).files.length > 0 &&
        ((document.getElementById("image-upload-file-label-" + t).style.color =
          "#888888"),
        (document.getElementById("image-upload-file-label-" + t).innerHTML =
          "Uploading..."),
        (document.getElementById("image-upload-submit-" + t).value =
          "uploading"),
        setTimeout(function () {
          document
            .getElementById("image-upload-submit-" + t)
            .click(function () {});
        }, 50));
    }),
    (document.getElementById("image-upload-submit-" + t).onclick = function (
      e
    ) {
      e.preventDefault();
      var n = document.getElementById("image-upload-" + t).files;
      n.length > 0 &&
        getCsrfToken()
          .then(sendFetch("image-upload", generateUploadFormdata(n)))
          .then(function (e) {
            200 === e.status
              ? e.json().then(function (e) {
                  var n = document.getElementById("uploaded-image-" + t),
                    a =
                      (document.getElementById("image-upload-button-" + t),
                      document.getElementById("image-upload-file-label-" + t));
                  (a.style.display = "none"),
                    (n.value = e.links[0]),
                    n.classList.remove("hidden"),
                    n.select();
                  var o = "Uploaded! Paste into editor";
                  (a.innerHTML = o),
                    (a.style.color = "#00c673"),
                    (a.style.position = "relative"),
                    (a.style.top = "5px");
                })
              : e.json().then(function (e) {
                  var n = e.error || "Invalid file!";
                  (document.getElementById(
                    "image-upload-file-label-" + t
                  ).innerHTML = n),
                    (document.getElementById(
                      "image-upload-file-label-" + t
                    ).style.color = "#e05252"),
                    (document.getElementById(
                      "image-upload-submit-" + t
                    ).style.display = "none");
                });
          })
          ["catch"](function () {});
    });
}
function listenForDetailsToggle() {
  for (
    var e = document.getElementsByTagName("DETAILS"), t = 0;
    t < e.length;
    t++
  )
    e[t].addEventListener("toggle", (e) => {
      var t = e.target,
        n = t.getElementsByTagName("SPAN")[0],
        a = t.getElementsByClassName("comment-username"),
        o = "";
      a.length > 1 && (o = " + " + (a.length - 1) + " replies");
      var i = a[0].textContent + o;
      t.open ? (n.innerHTML = "&nbsp;") : (n.innerHTML = i),
        t.getElementsByTagName("SUMMARY")[0].blur();
    });
}
function initializeCreditsPage() {
  localizeTimeElements(document.querySelectorAll(".ledger time"), {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
function selectNavigation(e, t) {
  const n = document.getElementById(e);
  n &&
    n.addEventListener("change", (e) => {
      let n = e.target.value;
      t && (n = t + n), InstantClick.preload(n), InstantClick.display(n);
    });
}
function initializeDashboardSort() {
  selectNavigation("dashboard_sort", "/dashboard?sort="),
    selectNavigation("dashboard_author"),
    selectNavigation("mobile_nav_dashboard");
}
function initializeDateHelpers() {
  localizeTimeElements(document.querySelectorAll("time.date-no-year"), {
    month: "short",
    day: "numeric",
  }),
    localizeTimeElements(document.querySelectorAll("time.date"), {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
}
function initializeDrawerSliders() {
  initializeSwipeGestures.called ||
    ((swipeState = "middle"), initializeSwipeGestures()),
    document.getElementById("on-page-nav-controls") &&
      (document.getElementById("sidebar-bg-left") &&
        (document.getElementById("sidebar-bg-left").onclick = () => {
          (swipeState = "middle"), slideSidebar("left", "outOfView");
        }),
      document.getElementById("sidebar-bg-right") &&
        (document.getElementById("sidebar-bg-right").onclick = () => {
          (swipeState = "middle"), slideSidebar("right", "outOfView");
        }),
      document.getElementById("on-page-nav-butt-left") &&
        (document.getElementById("on-page-nav-butt-left").onclick = () => {
          (swipeState = "left"), slideSidebar("left", "intoView");
        }),
      document.getElementById("on-page-nav-butt-right") &&
        (document.getElementById("on-page-nav-butt-right").onclick = () => {
          (swipeState = "right"), slideSidebar("right", "intoView");
        }),
      InstantClick.on("change", () => {
        document.getElementsByTagName("body")[0].classList.remove("modal-open"),
          slideSidebar("right", "outOfView"),
          slideSidebar("left", "outOfView");
      }));
  const e = document.getElementById("feed-filter-select");
  e &&
    e.addEventListener("change", (e) => {
      const t = e.target.value;
      InstantClick.preload(t), InstantClick.display(t);
    });
}
function getFormValues(e) {
  for (
    var t = e.action.match(/\/(\d+)$/)[1],
      n = e.querySelectorAll("input"),
      a = { id: t, article: {} },
      o = 0;
    o < n.length;
    o += 1
  ) {
    var i = n[o],
      r = i.getAttribute("name"),
      s = i.getAttribute("value");
    if (r.match(/\[(.*)\]/)) {
      var c = r.match(/\[(.*)\]$/)[1];
      a.article[c] = s;
    } else a[r] = s;
  }
  return a;
}
function toggleArchived(e, t) {
  "true" === t
    ? e.classList.add("story-archived", "hidden")
    : e.classList.remove("story-archived");
}
function toggleNotifications(e, t) {
  "Mute Notifications" === t
    ? e.setAttribute("value", "Receive Notifications")
    : e.setAttribute("value", "Mute Notifications");
}
function onXhrSuccess(e, t, n) {
  if (n.article.archived) toggleArchived(t, n.article.archived);
  else {
    var a = e.querySelector('[type="submit"]');
    toggleNotifications(a, a.getAttribute("value"));
  }
  t.querySelector(".js-dashboard-row-more").classList.add("hidden");
}
function handleFormSubmit(e) {
  e.preventDefault(), e.stopPropagation();
  var t = e.target,
    n = getFormValues(t),
    a = JSON.stringify(n),
    o = new FormData(t).get("_method") || "post",
    i = new XMLHttpRequest();
  i.open(o.toUpperCase(), t.action),
    i.setRequestHeader("Content-Type", "application/json"),
    i.send(a),
    (i.onload = function () {
      var e = t.closest(".js-dashboard-story");
      if (200 === i.status) {
        onXhrSuccess(t, e, n);
        var a =
          "Mute Notifications" === n.commit
            ? "Notifications Muted"
            : "Notifications Restored";
        e.querySelector(".js-dashboard-story-details").innerHTML = a;
      } else
        e.querySelector(".js-dashboard-story-details").innerHTML =
          "Failed to update article.";
    });
}
function initializeFormSubmit() {
  for (
    var e = document.querySelectorAll(
        ".js-dashboard-row-more-dropdown .js-archive-toggle"
      ),
      t = 0;
    t < e.length;
    t += 1
  )
    e[t].addEventListener("submit", handleFormSubmit);
}
function getMenu(e) {
  return e
    .closest(".js-dashboard-row-more")
    .querySelector(".js-dashboard-row-more-dropdown");
}
function hideIfNotAlreadyHidden(e) {
  e.classList.contains("block") && e.classList.remove("block");
}
function hideAllEllipsisMenusExcept(e) {
  for (
    var t = document.querySelectorAll(".js-dashboard-row-more-dropdown"), n = 0;
    n < t.length;
    n += 1
  )
    t[n] !== e && hideIfNotAlreadyHidden(t[n]);
}
function hideEllipsisMenus(e) {
  if (!e.target.closest(".js-dashboard-row-more"))
    for (
      var t = document.querySelectorAll(".js-dashboard-row-more-dropdown"),
        n = 0;
      n < t.length;
      n += 1
    )
      hideIfNotAlreadyHidden(t[n]);
}
function toggleEllipsisMenu(e) {
  var t = getMenu(e.target);
  hideAllEllipsisMenusExcept(t),
    t.classList.contains("block")
      ? t.classList.remove("block")
      : t.classList.add("block");
}
function initializeEllipsisMenuToggle() {
  for (
    var e = document.getElementsByClassName("js-dashboard-row-more-trigger"),
      t = 0;
    t < e.length;
    t += 1
  )
    e[t].addEventListener("click", toggleEllipsisMenu);
  const n = document.body;
  n && n.addEventListener("click", hideEllipsisMenus);
}
function initializeEllipsisMenu() {
  initializeEllipsisMenuToggle(), initializeFormSubmit();
}
function initializeHeroBannerClose() {
  let e = document.getElementById("hero-html-wrapper"),
    t = document.getElementById("js-hero-banner__x");
  e &&
    t &&
    t.addEventListener("click", () => {
      localStorage.setItem("exited_hero", e.dataset.name),
        (e.style.display = "none");
    });
}
function initializeLocalStorageRender() {
  try {
    var e = browserStoreCache("get");
    e &&
      ((document.body.dataset.user = e),
      initializeBaseUserData(),
      initializeReadingListIcons(),
      initializeAllFollowButts(),
      initializeUserFollowButts(),
      initializeSponsorshipVisibility());
  } catch (t) {
    browserStoreCache("remove");
  }
}
function initializeOnboardingTaskCard() {
  if ("yes" === localStorage.getItem("task-card-closed")) return;
  var e = document.getElementsByClassName("onboarding-task-card")[0];
  const t = userData();
  if (null != e && t) {
    var n = new Date(t.created_at),
      a = new Date();
    n > a.setDate(a.getDate() - 7) && (e.style.display = "block");
  }
}
function initializePWAFunctionality() {
  if (
    (window.matchMedia("(display-mode: standalone)").matches ||
      window.frameElement) &&
    (document
      .getElementById("pwa-nav-buttons")
      .classList.add("pwa-nav-buttons--showing"),
    (document.getElementById("app-back-button").onclick = (e) => {
      e.preventDefault(), window.history.back();
    }),
    (document.getElementById("app-forward-button").onclick = (e) => {
      e.preventDefault(), window.history.forward();
    }),
    (document.getElementById("app-refresh-button").onclick = (e) => {
      e.preventDefault(), window.location.reload();
    }),
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|DEV-Native-ios/i.test(
      navigator.userAgent
    ))
  )
    for (
      var e = window.location.protocol + "//" + window.location.host,
        t = document.getElementsByTagName("a"),
        n = 0,
        a = t.length;
      n < a;
      n++
    ) {
      var o = t[n];
      0 === o.href.indexOf(e + "/") ||
        0 === o.href.indexOf("/") ||
        (o.setAttribute("target", "_blank"),
        o.setAttribute("rel", "noopener noreferrer"));
    }
}
function initializePaymentPointers() {
  var e = document.getElementById("author-payment-pointer"),
    t = document.getElementById("base-payment-pointer"),
    n = document.querySelector("meta[name='monetization']");
  e && n
    ? (n.content = e.dataset.paymentPointer)
    : t && (n.content = t.dataset.paymentPointer);
}
function initializePodcastPlayback() {
  function e(e) {
    return document.getElementById(e);
  }
  function t(e) {
    return document.getElementsByClassName(e);
  }
  function n() {
    return (
      window.name || (window.name = Math.random()),
      {
        html: document.getElementById("audiocontent").innerHTML,
        currentTime: 0,
        playing: !1,
        muted: !1,
        volume: 1,
        duration: 1,
        updated: new Date().getTime(),
        windowName: window.name,
      }
    );
  }
  function a() {
    try {
      var e = JSON.parse(localStorage.getItem("media_playback_state_v2"));
      return e && window.name === e.windowName ? e : n();
    } catch (t) {
      return console.log(t), n();
    }
  }
  function o() {
    var t = e("audio"),
      n = a();
    return t && n.playing;
  }
  function i() {
    return e(`record-${window.activeEpisode}`);
  }
  function r(t) {
    o() &&
      i() &&
      (e(`record-${window.activeEpisode}`).classList.add("playing"), y(t));
  }
  function s() {
    window.activeEpisode &&
      e(`record-${window.activeEpisode}`) &&
      (e(`record-${window.activeEpisode}`).classList.remove("playing"),
      (window.activeEpisode = undefined));
  }
  function c() {
    var e = t("record-wrapper"),
      n = t("podcastliquidtag__record");
    return e.length > 0 ? e : n;
  }
  function l(e) {
    var t = e || a(),
      o = n();
    return (
      (o.currentTime = t.currentTime),
      (o.playing = t.playing),
      (o.muted = t.muted),
      (o.volume = t.volume),
      (o.duration = t.duration),
      localStorage.setItem("media_playback_state_v2", JSON.stringify(o)),
      o
    );
  }
  function d(t) {
    var n = a();
    (e("barPlayPause").onclick = function () {
      L(t);
    }),
      (e("mutebutt").onclick = function () {
        I(t);
      }),
      (e("volbutt").onclick = function () {
        I(t);
      }),
      (e("bufferwrapper").onclick = function (e) {
        x(e, t);
      }),
      (e("volumeslider").value = 100 * n.volume),
      (e("volumeslider").onchange = function (e) {
        B(e, t);
      }),
      (e("speed").onclick = function () {
        h(t);
      }),
      (e("closebutt").onclick = function () {
        A(t);
      });
  }
  function u(t) {
    return -1 !== e("audiocontent").innerHTML.indexOf(`${t}`);
  }
  function m(e) {
    return function () {
      var t = 0;
      e.currentTime > 0 &&
        (t = (e.buffered.end(e.buffered.length - 1) / e.duration) * 100);
      S(e.currentTime, e.duration, t);
    };
  }
  function f(e) {
    Runtime.podcastMessage
      ? Runtime.podcastMessage({
          action: "load",
          url: e.querySelector("source").src,
        })
      : e.load();
  }
  function g(t) {
    e("audiocontent").innerHTML = e(`hidden-audio-${t}`).innerHTML;
    var n = e("audio");
    n.addEventListener("timeupdate", m(n), !1), f(n), L(n), d(n);
  }
  function p() {
    var t = c();
    Array.prototype.forEach.call(t, function (t) {
      var n = t.getAttribute("data-episode");
      t.getAttribute("data-podcast");
      t.onclick = function () {
        if (u(n)) {
          var t = e("audio");
          t && L(t);
        } else s(), g(n);
      };
    });
  }
  function h(t) {
    var n = a(),
      o = e("speed"),
      i = parseFloat(o.getAttribute("data-speed"));
    2 === i
      ? (o.setAttribute("data-speed", 0.5),
        (o.innerHTML = "0.5x"),
        (n.playbackRate = 0.5))
      : (o.setAttribute("data-speed", i + 0.5),
        (o.innerHTML = i + 0.5 + "x"),
        (n.playbackRate = i + 0.5)),
      l(n),
      Runtime.podcastMessage
        ? Runtime.podcastMessage({
            action: "rate",
            rate: n.playbackRate.toString(),
          })
        : (t.playbackRate = n.playbackRate);
  }
  function y(t) {
    var n = e(`status-message-${window.activeEpisode}`);
    n
      ? t
        ? (n.classList.add("showing"), (n.innerHTML = t))
        : n.classList.remove("showing")
      : "initializing..." === t &&
        document.querySelector(".status-message") &&
        (document.querySelector(".status-message").innerHTML = t);
  }
  function v() {
    e("barPlayPause").classList.add("playing"),
      e("progressBar").classList.add("playing"),
      e("animated-bars").classList.add("playing");
  }
  function b() {
    e("barPlayPause").classList.remove("playing"),
      e("animated-bars").classList.remove("playing");
  }
  function w(e) {
    return new Promise(function (t, n) {
      var o = a();
      Runtime.podcastMessage
        ? (Runtime.podcastMessage({
            action: "play",
            url: e.querySelector("source").src,
            seconds: o.currentTime.toString(),
          }),
          O(!0),
          t())
        : ((e.currrentTime = o.currentTime),
          e
            .play()
            .then(function () {
              O(!0), t();
            })
            ["catch"](function (e) {
              console.log(e), O(!1), n();
            }));
    });
  }
  function k() {
    var e = t("podcast-episode-container")[0];
    return e === undefined && (e = t("podcastliquidtag")[0]), e.dataset.meta;
  }
  function _() {
    if (Runtime.podcastMessage)
      try {
        var e = JSON.parse(k());
        Runtime.podcastMessage({
          action: "metadata",
          episodeName: e.episodeName,
          podcastName: e.podcastName,
          podcastImageUrl: e.podcastImageUrl,
        });
      } catch (t) {
        console.log("Unable to load Podcast Episode metadata", t);
      }
  }
  function E(e) {
    _(),
      w(e)
        .then(function () {
          r(), v();
        })
        ["catch"](function () {
          w(e),
            setTimeout(function () {
              r("initializing..."), v();
            }, 5);
        });
  }
  function T(e) {
    Runtime.podcastMessage
      ? Runtime.podcastMessage({ action: "pause" })
      : e.pause(),
      O(!1),
      s(),
      b();
  }
  function L(e) {
    (window.activeEpisode = e.getAttribute("data-episode")),
      (window.activePodcast = e.getAttribute("data-podcast"));
    var t = a(),
      n = {
        episode: window.activeEpisode,
        podcast: window.activePodcast,
        deviceType: D,
      };
    t.playing
      ? ((n.action = "pause"), T(e), y(null))
      : ((n.action = "play"), y("initializing..."), E(e)),
      ahoy.track("Podcast Player Streaming", n);
  }
  function I(t) {
    var n = a();
    e("mutebutt").classList.add(n.muted ? "hidden" : "showing"),
      e("volumeindicator").classList.add(n.muted ? "showing" : "hidden"),
      e("mutebutt").classList.remove(n.muted ? "showing" : "hidden"),
      e("volumeindicator").classList.remove(n.muted ? "hidden" : "showing"),
      (n.muted = !n.muted),
      Runtime.podcastMessage
        ? Runtime.podcastMessage({ action: "muted", muted: n.muted.toString() })
        : (t.muted = n.muted),
      l(n);
  }
  function B(e, t) {
    var n = a();
    (n.volume = e.target.value / 100),
      Runtime.podcastMessage
        ? Runtime.podcastMessage({ action: "volume", volume: n.volume })
        : (t.volume = n.volume),
      l(n);
  }
  function S(t, n, o) {
    var i = e("progress"),
      r = e("buffer"),
      s = e("time"),
      c = 0,
      d = t - Math.floor(t);
    if (t > 0 && ((c = Math.floor((100 / n) * t)), d < 0.4)) {
      var u = a();
      (u.duration = n), (u.currentTime = t), l(u);
    }
    i &&
      s &&
      t > 0 &&
      ((i.style.width = c + "%"),
      (r.style.width = o + "%"),
      (s.innerHTML = C(t) + " / " + C(n)));
  }
  function x(t, n) {
    var o = a(),
      i = e("progress"),
      r = e("time");
    if (t.clientX > 128) {
      var s = (t.clientX - 128) / (window.innerWidth - 133),
        c = o.duration;
      (o.currentTime = c * s),
        Runtime.podcastMessage
          ? Runtime.podcastMessage({
              action: "seek",
              seconds: o.currentTime.toString(),
            })
          : (n.currentTime = o.currentTime),
        (r.innerHTML = C(o.currentTime) + " / " + C(o.duration)),
        (i.style.width = 100 * s + "%");
    }
  }
  function C(e) {
    var t = Math.floor(e),
      n = Math.floor(t / 60);
    return (
      (n = n >= 10 ? n : "0" + n) +
      ":" +
      (t = (t = Math.floor(t % 60)) >= 10 ? t : "0" + t)
    );
  }
  function A(t) {
    t.removeEventListener("timeupdate", m(t), !1),
      (e("audiocontent").innerHTML = ""),
      s(),
      l(n()),
      Runtime.podcastMessage && Runtime.podcastMessage({ action: "terminate" });
  }
  function M(t) {
    if ("attributes" === t.type) {
      var n = {};
      try {
        var o = e("audiocontent").dataset.podcast;
        n = JSON.parse(o);
      } catch (r) {
        return void console.log(r);
      }
      var i = a();
      "tick" === n.action
        ? ((i.currentTime = n.currentTime),
          (i.duration = n.duration),
          S(i.currentTime, i.duration, 100))
        : "init" === n.action
        ? ((e("time").innerHTML = "initializing..."), (i.currentTime = 0))
        : console.log("Unrecognized podcast message: ", n),
        l(i);
    }
  }
  function N() {
    new MutationObserver(function (e) {
      e.forEach(function (e) {
        M(e);
      });
    }).observe(e("audiocontent"), { attributes: !0 });
  }
  function H() {
    Runtime.isNativeIOS("podcast")
      ? ((D = "iOS"),
        (Runtime.podcastMessage = function (e) {
          try {
            window.webkit.messageHandlers.podcast.postMessage(e);
          } catch (t) {
            console.log(t.message);
          }
        }))
      : Runtime.isNativeAndroid("podcastMessage") &&
        ((D = "Android"),
        (Runtime.podcastMessage = function (e) {
          try {
            AndroidBridge.podcastMessage(JSON.stringify(e));
          } catch (t) {
            console.log(t.message);
          }
        }));
  }
  function R() {
    var t = a();
    document.getElementById("audiocontent").innerHTML = t.html;
    var n = e("audio");
    n !== undefined && null !== n
      ? (Runtime.podcastMessage && (n.currentTime = t.currentTime || 0),
        f(n),
        t.playing &&
          w(n)["catch"](function () {
            b();
          }),
        setTimeout(function () {
          n.addEventListener("timeupdate", m(n), !1), N();
        }, 500),
        d(n))
      : (audioInitialized = !1);
  }
  function O(e) {
    var t = a();
    (t.playing = e), l(t);
  }
  var D = "web";
  H(), r(), p(), audioInitialized || ((audioInitialized = !0), R());
  var P = e("audio"),
    z = e("audiocontent");
  P && z && z.innerHTML.length < 25 && f(P);
}
function initializeReadingListIcons() {
  setReadingListButtonsState(),
    addReadingListCountToHomePage(),
    addHoverEffectToReadingListButtons();
}
function setReadingListButtonsState() {
  var e = document.querySelectorAll(
    ".bookmark-button:not([data-initial-feed])"
  );
  Array.from(e).forEach(highlightButton);
}
function highlightButton(e) {
  var t = userData(),
    n = parseInt(e.dataset.reactableId, 10);
  t && t.reading_list_ids.indexOf(n) > -1
    ? e.classList.add("selected")
    : e.classList.remove("selected"),
    e.addEventListener("click", reactToReadingListButtonClick);
}
function addReadingListCountToHomePage() {
  var e,
    t = userData();
  t &&
    document.getElementById("reading-list-count") &&
    ((e = t.reading_list_ids.length > 0 ? t.reading_list_ids.length : ""),
    (document.getElementById("reading-list-count").innerHTML = e),
    (document.getElementById("reading-list-count").dataset.count =
      t.reading_list_ids.length));
}
function reactToReadingListButtonClick(e) {
  var t;
  e.preventDefault(),
    sendHapticMessage("medium"),
    "logged-out" !== document.body.getAttribute("data-user-status")
      ? (renderOptimisticResult((t = properButtonFromEvent(e))),
        getCsrfToken()
          .then(sendFetch("reaction-creation", buttonFormData(t)))
          .then(function (e) {
            if (200 === e.status)
              return e.json().then(function (e) {
                renderButtonState(t, e), renderNewSidebarCount(t, e);
              });
          })
          ["catch"](function () {}))
      : showModal("add-to-readinglist-from-index");
}
function renderButtonState(e, t) {
  "create" === t.result
    ? (e.classList.add("selected"), addHoverEffectToReadingListButtons(e))
    : e.classList.remove("selected");
}
function renderNewSidebarCount(e, t) {
  var n,
    a = document.getElementById("reading-list-count").dataset.count;
  (a = parseInt(a, 10)),
    "create" === t.result ? (n = a + 1) : 0 !== a && (n = a - 1),
    (document.getElementById("reading-list-count").dataset.count = n),
    (document.getElementById("reading-list-count").innerHTML = n > 0 ? n : "");
}
function buttonFormData(e) {
  var t = new FormData();
  return (
    t.append("reactable_type", "Article"),
    t.append("reactable_id", e.dataset.reactableId),
    t.append("category", "readinglist"),
    t
  );
}
function renderOptimisticResult(e) {
  renderButtonState(e, { result: "create" });
}
function properButtonFromEvent(e) {
  return "BUTTON" === e.target.tagName ? e.target : e.target.parentElement;
}
function addHoverEffectToReadingListButtons() {
  var e = document.getElementsByClassName("articles-list");
  Array.from(e).forEach(function (e) {
    e.addEventListener(
      "mouseover",
      readingListButtonMouseHandler.bind("Unsave")
    ),
      e.addEventListener(
        "mouseout",
        readingListButtonMouseHandler.bind("Saved")
      );
  });
}
function isReadingListButtonHoverTarget(e) {
  var t = e.classList;
  return (
    ("BUTTON" === e.tagName &&
      t.contains("bookmark-button") &&
      t.contains("selected")) ||
    ("SPAN" === e.tagName && t.contains("bm-success"))
  );
}
function readingListButtonMouseHandler(e) {
  var t = e.target;
  if (isReadingListButtonHoverTarget(t)) {
    e.preventDefault();
    var n = this;
    ("BUTTON" === t.tagName
      ? t.getElementsByClassName("bm-success")[0]
      : t
    ).innerHTML = n;
  }
}
function initializeSettings() {
  const e = document.getElementById("settings-org-secret");
  e &&
    e.addEventListener("click", (e) => {
      e.target.select();
    });
  let t = document.getElementById("rss-fetch-time");
  if (t) {
    var n = t.getAttribute("datetime"),
      a = {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
    t.textContent = timestampToLocalDateTime(n, navigator.language, a);
  }
  const o = document.getElementById("mobile-page-selector");
  o &&
    o.addEventListener("change", (e) => {
      const t = e.target.value;
      InstantClick.preload(t), InstantClick.display(t);
    });
}
function initializeSpecialNavigationFunctionality() {
  var e = document.getElementById("connect-link"),
    t = document.getElementById("notifications-link"),
    n = document.getElementById("moderation-link");
  e &&
    (document.getElementById("notifications-container")
      ? (t.blur(), t.classList.add("crayons-header__link--current"))
      : t.classList.remove("crayons-header__link--current"),
    document.getElementById("chat")
      ? (e.blur(), e.classList.add("crayons-header__link--current"))
      : e.classList.remove("crayons-header__link--current"),
    document.getElementById("moderation-page")
      ? (n.blur(), n.classList.add("crayons-header__link--current"))
      : n.classList.remove("crayons-header__link--current"));
}
function sponsorClickHandler(e) {
  e.target.classList.contains("follow-action-button") &&
    (handleOptimisticButtRender(e.target), handleFollowButtPress(e.target)),
    ga(
      "send",
      "event",
      "click",
      "click sponsor link",
      e.target.dataset.details,
      null
    );
}
function listenForSponsorClick() {
  setTimeout(() => {
    if (window.ga)
      for (
        var e = document.getElementsByClassName("partner-link"), t = 0;
        t < e.length;
        t++
      )
        e[t].onclick = sponsorClickHandler;
  }, 400);
}
function initializeSponsorshipVisibility() {
  var e =
      document.getElementById("sponsorship-widget") ||
      document.getElementById("partner-content-display"),
    t = userData();
  e &&
    setTimeout(() => {
      window.ga &&
        0 === document.querySelectorAll("[data-partner-seen]").length &&
        (ga(
          "send",
          "event",
          "view",
          "sponsor displayed on page",
          e.dataset.details,
          null
        ),
        (e.dataset.partnerSeen = "true"));
    }, 400),
    e && t && t.display_sponsors
      ? (e.classList.remove("hidden"), listenForSponsorClick())
      : e && t
      ? e.classList.add("hidden")
      : e && (e.classList.remove("hidden"), listenForSponsorClick());
}
function slideContent(e) {
  var t = function (e, t) {
      var n = document.createEvent("CustomEvent");
      return (
        n.initCustomEvent(t, !0, !0, e.target),
        e.target.dispatchEvent(n),
        (n = null),
        !1
      );
    },
    n = !0,
    a = { x: 0, y: 0 },
    o = { x: 0, y: 0 },
    i = {
      touchstart: function (e) {
        a = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
          scrollY: window.scrollY,
        };
      },
      touchmove: function (e) {
        (n = !1),
          (o = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
            scrollY: window.scrollY,
          });
      },
      touchend: function (e) {
        if (n) t(e, "fc");
        else {
          var i = o.x - a.x,
            r = Math.abs(i),
            s = o.y - a.y,
            c = Math.abs(s),
            l = Math.abs(a.scrollY - o.scrollY);
          if (Math.max(r, c) > 15)
            t(
              e,
              r / 2 > c && l < 5
                ? i < 0
                  ? "swl"
                  : "swr"
                : s < 0
                ? "swu"
                : "swd"
            );
        }
        n = !0;
      },
      touchcancel: function () {
        n = !1;
      },
    };
  for (var r in i) e.addEventListener(r, i[r], !1);
}
function initializeSwipeGestures() {
  initializeSwipeGestures.called = !0;
  let e = "middle";
  setTimeout(function () {
    slideContent(document);
    document.body.addEventListener(
      "swl",
      (t) => {
        e = handleSwipeLeft(t, e);
      },
      !1
    ),
      document.body.addEventListener(
        "swr",
        (t) => {
          e = handleSwipeRight(t, e);
        },
        !1
      );
  }, 50);
}
function handleSwipeLeft(e, t) {
  if (document.getElementById("on-page-nav-controls"))
    return "middle" == t
      ? ((t = "right"), slideSidebar("right", "intoView"), t)
      : ((t = "middle"), slideSidebar("left", "outOfView"), t);
}
function handleSwipeRight(e, t) {
  if (document.getElementById("on-page-nav-controls"))
    return "middle" == t
      ? ((t = "left"), slideSidebar("left", "intoView"), t)
      : ((t = "middle"), slideSidebar("right", "outOfView"), t);
}
function formatDateTime(e, t) {
  return new Intl.DateTimeFormat("en-US", e).format(t);
}
function convertUtcTime(e) {
  return formatDateTime(
    { hour: "numeric", minute: "numeric", timeZoneName: "short" },
    new Date(e)
  );
}
function convertUtcDate(e) {
  return formatDateTime({ month: "short", day: "numeric" }, new Date(e));
}
function convertCalEvent(e) {
  return formatDateTime(
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    },
    new Date(e)
  );
}
function updateLocalDateTime(e, t, n) {
  for (var a, o = 0; o < e.length; o += 1)
    (a = t(n(e[o]))), (e[o].innerHTML = a);
}
function initializeTimeFixer() {
  var e = document.getElementsByClassName("utc-time"),
    t = document.getElementsByClassName("utc-date"),
    n = document.getElementsByClassName("utc");
  n &&
    (updateLocalDateTime(e, convertUtcTime, (e) => e.dataset.datetime),
    updateLocalDateTime(t, convertUtcDate, (e) => e.dataset.datetime),
    updateLocalDateTime(n, convertCalEvent, (e) => e.innerHTML));
}
function getById(e) {
  return document.getElementById(e);
}
function getClassList(e) {
  return getById(e).classList;
}
function blur(e, t) {
  setTimeout(() => {
    document.activeElement !== getById(t) &&
      getClassList("crayons-header__menu").remove("showing");
  }, 10);
}
function removeShowingMenu() {
  getClassList("crayons-header__menu").remove("showing"),
    setTimeout(() => {
      getClassList("crayons-header__menu").remove("showing");
    }, 5),
    setTimeout(() => {
      getClassList("crayons-header__menu").remove("showing");
    }, 150);
}
function toggleMenu() {
  getClassList("crayons-header__menu").toggle("showing");
}
function initializeTouchDevice() {
  var e = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|DEV-Native-ios/i.test(
    navigator.userAgent
  );
  "DEV-Native-ios" === navigator.userAgent &&
    document.body.classList.add("dev-ios-native-body"),
    setTimeout(() => {
      removeShowingMenu(),
        e
          ? getById("navigation-butt").addEventListener("click", toggleMenu)
          : (getClassList("crayons-header__menu").add("desktop"),
            getById("navigation-butt").addEventListener("focus", () =>
              getClassList("crayons-header__menu").add("showing")
            ),
            getById("last-nav-link").addEventListener("blur", (e) =>
              blur(e, "second-last-nav-link")
            ),
            getById("navigation-butt").addEventListener("blur", (e) =>
              blur(e, "first-nav-link")
            ));
    }, 10);
}
function initializeUserProfilePage() {
  const e = document.getElementsByClassName("profile-dropdown")[0];
  if (e) {
    const t = userData();
    if (t && t.username === e.dataset.username) e.hidden = !0;
    else {
      e.hidden = !1;
      const t = document.getElementById("user-profile-dropdown");
      if (t) {
        const n = document.getElementById("user-profile-dropdownmenu");
        t.addEventListener("click", () => {
          n.classList.toggle("block");
          var t = e.querySelector(".report-abuse-link-wrapper");
          t.innerHTML = `<a href="${t.dataset.path}" class="crayons-link crayons-link--block">Report Abuse</a>`;
        });
      }
    }
  }
}
function initializeVideoPlayback() {
  function e(e) {
    return document.getElementById(e);
  }
  function t(e, t) {
    t || (t = window.location.href), (e = e.replace(/[\[\]]/g, "\\$&"));
    var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return n
      ? n[2]
        ? decodeURIComponent(n[2].replace(/\+/g, " "))
        : ""
      : null;
  }
  function n(e) {
    var t;
    return e.length < 3
      ? e
      : e.length < 6
      ? 60 * +(t = e.split(":"))[0] + +t[1]
      : 60 * +(t = e.split(":"))[0] * 60 + 60 * +t[1] + +t[2];
  }
  function a(t) {
    var n = t ? "play" : "pause";
    if (u !== n) {
      u = n;
      var a = {
        article: i(e("video-player-source")).id,
        deviceType: d,
        action: n,
      };
      ahoy.track("Video Player Streaming", a);
    }
  }
  function o(e, t) {
    var n = setInterval(function () {
      "undefined" != typeof jwplayer &&
        (clearInterval(n),
        jwplayer(`video-player-${t.id}`).setup({
          file: t.video_source_url,
          mediaid: t.video_code,
          image: t.video_thumbnail_url,
          playbackRateControls: !0,
          tracks: [
            {
              file: t.video_closed_caption_track_url,
              label: "English",
              kind: "captions",
              default: !1,
            },
          ],
        }),
        e &&
          (jwplayer().on("firstFrame", function () {
            jwplayer().seek(e);
          }),
          jwplayer().on("play", function () {
            a(!0);
          }),
          jwplayer().on("pause", function () {
            a(!1);
          })));
    }, 2);
  }
  function i(e) {
    try {
      return JSON.parse(e.dataset.meta);
    } catch (t) {
      console.log("Unable to load Podcast Episode metadata", t);
    }
  }
  function r() {
    var t = i(m);
    e(`video-player-${t.id}`);
    e("pause-butt").classList.add("active"),
      e("play-butt").classList.remove("active"),
      Runtime.videoMessage({
        action: "play",
        url: t.video_source_url,
        seconds: l,
      }),
      a(!0);
  }
  function s(t) {
    if ("attributes" === t.type) {
      var n = {};
      try {
        var o = e("video-player-source").dataset.message;
        n = JSON.parse(o);
      } catch (i) {
        return void console.log(i);
      }
      "pause" == n.action
        ? (e("pause-butt").classList.remove("active"),
          e("play-butt").classList.add("active"),
          a(!1))
        : "tick" == n.action && (l = n.currentTime);
    }
  }
  function c(a) {
    var c = n(t("t") || "0"),
      u = i(a);
    if (Runtime.isNativeIOS("video"))
      (d = "iOS"),
        (Runtime.videoMessage = function (e) {
          try {
            window.webkit.messageHandlers.video.postMessage(e);
          } catch (t) {
            console.log(t.message);
          }
        });
    else {
      if (!Runtime.isNativeAndroid("videoMessage")) return void o(c, u);
      (d = "Android"),
        (Runtime.videoMessage = function (e) {
          try {
            AndroidBridge.videoMessage(JSON.stringify(e));
          } catch (t) {
            console.log(t.message);
          }
        });
    }
    var m = e(`video-player-${u.id}`);
    m.addEventListener("click", r),
      m.classList.add("native"),
      e("play-butt").classList.add("active"),
      new MutationObserver(function (e) {
        e.forEach(function (e) {
          s(e);
        });
      }).observe(a, { attributes: !0 }),
      (l = `${c}`);
  }
  var l = "0",
    d = "web",
    u = "",
    m = e("video-player-source");
  null !== m && c(m);
}
function browserStoreCache(e, t) {
  try {
    switch (e) {
      case "set":
        localStorage.setItem("current_user", t),
          localStorage.setItem(
            "config_body_class",
            JSON.parse(t).config_body_class
          );
        break;
      case "remove":
        localStorage.removeItem("current_user");
        break;
      default:
        return localStorage.getItem("current_user");
    }
  } catch (n) {
    navigator.cookieEnabled && browserStoreCache("remove");
  }
  return undefined;
}
function buildArticleHTML(e) {
  if (e && "PodcastEpisode" === e.class_name)
    return `<article class="crayons-story crayons-podcast-episode mb-2">\n        <div class="crayons-story__body flex flex-start">\n          <a href="${e.podcast.slug}" class="crayons-podcast-episode__cover">\n            <img src="${e.podcast.image_url}" alt="${e.podcast.title}" />\n          </a>\n          <div class="pt-2 flex-1">\n            <p class="crayons-podcast-episode__author">\n              ${e.podcast.title}\n            </p>\n            <h2 class="crayons-podcast-episode__title crayons-story__title mb-0">\n              <a href="${e.path}" id="article-link-${e.id}">\n                ${e.podcast.title}\n              </a>\n            </h2>\n          </div>\n        </div>\n      </article>`;
  if (e) {
    var t = document.getElementById("index-container"),
      n = "",
      a = "";
    t && (a = JSON.parse(t.dataset.params).tag),
      e.flare_tag &&
        a !== e.flare_tag.name &&
        (n =
          "<a href='/t/" +
          e.flare_tag.name +
          "' class='crayons-tag' style='background:" +
          e.flare_tag.bg_color_hex +
          ";color:" +
          e.flare_tag.text_color_hex +
          "'><span className='crayons-tag__prefix'>#</span>" +
          e.flare_tag.name +
          "</a>"),
      "PodcastEpisode" === e.class_name &&
        (n = "<span class='crayons-story__flare-tag'>podcast</span>"),
      "Comment" === e.class_name &&
        (n = "<span class='crayons-story__flare-tag'>comment</span>"),
      "User" === e.class_name &&
        (n =
          "<span class='crayons-story__flare-tag' style='background:#5874d9;color:white;'>person</span>");
    var o = "",
      i = e.tag_list || e.cached_tag_list_array || [];
    n &&
      ((i = i.filter(function (t) {
        return t !== e.flare_tag.name;
      })),
      (o += n)),
      i &&
        i.forEach(function (e) {
          o =
            o +
            '<a href="/t/' +
            e +
            '" class="crayons-tag"><span class="crayons-tag__prefix">#</span>' +
            e +
            "</a>\n";
        });
    var r = "",
      s = "0";
    (e.comments_count || "0") > 0 && (s = e.comments_count || "0"),
      "User" !== e.class_name &&
        (r =
          '<a href="' +
          e.path +
          '#comments" class="crayons-btn crayons-btn--s crayons-btn--ghost crayons-btn--icon-left "><svg class="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"/></svg>' +
          s +
          '<span class="hidden s:inline">&nbsp;comments</span></a>');
    var c,
      l,
      d = e.public_reactions_count || "0",
      u = "";
    "User" !== e.class_name &&
      (u =
        '<a href="' +
        e.path +
        '" class="crayons-btn crayons-btn--s crayons-btn--ghost crayons-btn--icon-left"><svg class="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"/></svg>' +
        d +
        '<span class="hidden s:inline">&nbsp;reactions</span></a>'),
      "PodcastEpisode" === e.class_name
        ? ((c = e.main_image), (l = e.slug), e.title)
        : ((c = e.user.profile_image_90), (l = e.user.username), e.user.name);
    var m = "",
      f = "",
      g = "crayons-avatar--l";
    e.organization &&
      !document.getElementById("organization-article-index") &&
      ((f =
        '<a href="/' +
        e.organization.slug +
        '" class="crayons-logo crayons-logo--l"><img alt="' +
        e.organization.name +
        ' logo" src="' +
        e.organization.profile_image_90 +
        '" class="crayons-logo__image" loading="lazy"/></a>'),
      (m =
        '<span><span class="crayons-story__tertiary fw-normal"> for </span><a href="/' +
        e.organization.slug +
        '" class="crayons-story__secondary fw-medium">' +
        e.organization.name +
        "</a></span>"),
      (g =
        "crayons-avatar--s absolute -right-2 -bottom-2 border-solid border-2 border-base-inverted"));
    var p = "";
    e.published_at_int &&
      (p = timeAgo({ oldTimeInSeconds: e.published_at_int }));
    var h = "";
    e.readable_publish_date &&
      (h = e.published_timestamp
        ? '<time datetime="' +
          e.published_timestamp +
          '">' +
          e.readable_publish_date +
          " " +
          p +
          "</time>"
        : "<time>" + e.readable_publish_date + " " + p + "</time>");
    var y =
        '<div class="crayons-story__meta">      <div class="crayons-story__author-pic">        ' +
        f +
        '        <a href="/' +
        l +
        '" class="crayons-avatar ' +
        g +
        '">          <img src="' +
        c +
        '" alt="' +
        l +
        ' profile" class="crayons-avatar__image" loading="lazy" />        </a>      </div>      <div>        <p>          <a href="/' +
        l +
        '" class="crayons-story__secondary fw-medium">' +
        filterXSS(e.user.name) +
        "</a>          " +
        m +
        '        </p>        <a href="' +
        e.path +
        '" class="crayons-story__tertiary fs-xs">          ' +
        h +
        "        </a>      </div>    </div>",
      v = "",
      b = "";
    if (e.highlight && e.highlight.body_text.length > 0) {
      var w = e.highlight.body_text[0],
        k = "";
      w.toLowerCase() !== w.toUpperCase() && (k = "\u2026"),
        (v = k + e.highlight.body_text.join("...") + "\u2026").length > 0 &&
          (b = '<div class="crayons-story__snippet mb-1">' + v + "</div>");
    }
    var _ = "";
    "Article" === e.class_name &&
      (_ =
        '<small class="crayons-story__tertiary fs-xs mr-2">' +
        ((e.reading_time || null) < 1 ? "1 min" : e.reading_time + " min") +
        " read</small>");
    var E = "";
    "Article" === e.class_name
      ? (E =
          '<button type="button" id="article-save-button-' +
          e.id +
          '" class="crayons-btn crayons-btn--secondary crayons-btn--s bookmark-button" data-reactable-id="' +
          e.id +
          '">                      <span class="bm-initial">Save</span>                      <span class="bm-success">Saved</span>                    </button>')
      : "User" === e.class_name &&
        (E =
          '<button type="button" class="crayons-btn crayons-btn--secondary crayons-btn--icon-left fs-s bookmark-button article-engagement-count engage-button follow-action-button follow-user"                       data-info=\'{"id":' +
          e.id +
          ',"className":"User"}\' data-follow-action-button>                       &nbsp;                    </button>');
    var T = "";
    return (
      e.cloudinary_video_url &&
        (T =
          '<a href="' +
          e.path +
          '" class="crayons-story__video" style="background-image:url(' +
          e.cloudinary_video_url +
          ')"><div class="crayons-story__video__time">' +
          (e.video_duration_string || e.video_duration_in_minutes) +
          "</div></a>"),
      '<article class="crayons-story" data-article-path="' +
        e.path +
        '" data-content-user-id="' +
        e.user_id +
        '">      <div role="presentation">        ' +
        T +
        '        <div class="crayons-story__body">          <div class="crayons-story__top">            ' +
        y +
        '          </div>          <div class="crayons-story__indention">            <h2 class="crayons-story__title"><a href="' +
        e.path +
        '" id="article-link-' +
        e.id +
        '">' +
        filterXSS(e.title) +
        '</a></h2>            <div class="crayons-story__tags">' +
        o +
        "</div>            " +
        b +
        '            <div class="crayons-story__bottom">              <div class="crayons-story__details">' +
        u +
        r +
        '</div>                <div class="crayons-story__save">                ' +
        _ +
        "                " +
        E +
        "              </div>            </div>          </div>        </div>      </div>    </article>"
    );
  }
  return "";
}
function buildCommentFormHTML(e, t, n) {
  var a = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content"),
    o = userData();
  o && !o.codeOfConduct && o.commentCount;
  var i = Math.floor(1991 * Math.random());
  return `<form class="comment-form pt-4" onsubmit="handleCommentSubmit.bind(this)(event)" id="new-comment-${n}" action="/comments" accept-charset="UTF-8" method="post" data-comment-id="${n}">\n      <input name="utf8" type="hidden" value="&#x2713;" />\n      <input type="hidden" name="authenticity_token" value="${a}">\n      <input value="${e}" type="hidden" name="comment[commentable_id]" id="comment_commentable_id" />\n      <input value="${t}" type="hidden" name="comment[commentable_type]" id="comment_commentable_type" />\n      <input value="${n}" type="hidden" name="comment[parent_id]" id="comment_parent_id" />\n      <div class="comment-form__inner">\n        <div class="comment-form__field">\n          <textarea id="textarea-for-${n}" class="crayons-textfield crayons-textfield--ghost comment-textarea" name="comment[body_markdown]" placeholder="Reply..." required="required" onkeydown="handleKeyDown(event)" onfocus="handleFocus(event)" oninput="handleChange(event)" onkeykup="handleKeyUp(event)"></textarea>\n          <div class="comment-form__toolbar">\n            <div class="editor-image-upload">\n              <input type="file" id="image-upload-${i}"  name="file" accept="image/*" style="display:none">\n              <button type="button" class="crayons-btn crayons-btn--s crayons-btn--icon-left crayons-btn--ghost-dimmed" onclick="handleImageUpload(event, ${i})" id="image-upload-button-${i}">\n                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="crayons-icon"><path d="M20 5H4v14l9.292-9.294a1 1 0 011.414 0L20 15.01V5zM2 3.993A1 1 0 012.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 01-.992.993H2.992A.993.993 0 012 20.007V3.993zM8 11a2 2 0 110-4 2 2 0 010 4z"/></svg>\n                <span class="hidden s:inline-block">Upload image</span>\n              </button>\n              <label  class="image-upload-file-label" id="image-upload-file-label-${i}"></label>\n              <input type="submit" id="image-upload-submit-${i}" value="Upload" style="display:none">\n              <input class="crayons-textfield fs-s w-auto uploaded-image hidden" type="text" id="uploaded-image-${i}" />\n            </div>\n            <button type="button" class="crayons-btn crayons-btn--s crayons-btn--icon-left crayons-btn--ghost-dimmed response-templates-button" title="Use a response template" data-has-listener="false">\n              <svg width="24" height="24" class="crayons-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 18.5V5a3 3 0 013-3h14a1 1 0 011 1v18a1 1 0 01-1 1H6.5A3.5 3.5 0 013 18.5zM19 20v-3H6.5a1.5 1.5 0 100 3H19zM10 4H6a1 1 0 00-1 1v10.337A3.485 3.485 0 016.5 15H19V4h-2v8l-3.5-2-3.5 2V4z"/></svg>\n              <span class="hidden s:inline-block">Templates</span>\n            </button>\n            <a href="/p/editor_guide" class="crayons-btn crayons-btn--ghost-dimmed crayons-btn--icon crayons-btn--s ml-auto" target="_blank" rel="noopener" title="Markdown Guide">\n              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="crayons-icon"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg>\n            </a>\n          </div>\n        </div>\n        <div class="response-templates-container crayons-card crayons-card--secondary p-4 mb-4 fs-base comment-form__templates hidden">\n          <header>\n            <button type="button" class="personal-template-button active" data-target-type="personal" data-form-id="new_comment">Personal</button>\n            <button type="button" class="moderator-template-button hidden" data-target-type="moderator" data-form-id="new_comment">Moderator</button>\n          </header>\n          <img class="loading-img hidden" src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/loading-ellipsis-b714cf681fd66c853ff6f03dd161b77aa3c80e03cdc06f478b695f42770421e9.svg" alt="loading">\n          <div class="personal-responses-container"></div>\n          <div class="moderator-responses-container hidden"></div>\n          <a target="_blank" rel="noopener nofollow" href="/settings/response-templates">Create template</a>\n          <p>Templates let you quickly answer FAQs or store snippets for re-use.</p>\n        </div>\n        <div class="comment-form__preview text-styles text-styles--secondary"></div>\n        <div class="comment-form__buttons mb-4">\n          <button type="submit" class="crayons-btn comment-action-button mr-2 js-btn-enable" name="submit" disabled>Submit</button>\n          <button type="button" class="preview-toggle crayons-btn crayons-btn--secondary comment-action-button comment-action-preview mr-2 js-btn-enable" onclick="handleCommentPreview(event)" disabled>Preview</button>\n          <button type="button" class="crayons-btn crayons-btn--ghost" onclick="handleFormClose(event)">Dismiss</button>\n        </div>\n      </div>\n    </form>`;
}
function buildCommentHTML(e) {
  var t = "",
    n = "",
    a = "",
    o = "",
    i = "",
    r = "";
  return (
    (t = e.newly_created
      ? 0 == e.depth
        ? "root"
        : e.depth < 3
        ? "child"
        : "child flat-node"
      : "child flat-node"),
    e.user.twitter_username &&
      e.user.twitter_username.length > 0 &&
      (a =
        '<a href="http://twitter.com/' +
        e.user.twitter_username +
        '" rel="noopener noreferrer" target="_blank"><img class="icon-img" alt="twitter logo" src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/twitter-logo-7693bfa09ce3f28fea334a5dcf36ddf1c8d58b01bbfd78cca3b1383498bd86a8.svg" /></a>'),
    e.user.github_username &&
      e.user.github_username.length > 0 &&
      (n =
        '<a href="http://github.com/' +
        e.user.github_username +
        '" rel="noopener noreferrer" target="_blank"><img class="icon-img" alt="github logo" src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/github-logo-ba8488d21cd8ee1fee097b8410db9deaa41d0ca30b004c0c63de0a479114156f.svg" /></a>'),
    e.newly_created && (o = "comment-created-via-fetch"),
    e.depth < 3 &&
      ((i = "<details open><summary><span>&nbsp;</span></summary>"),
      (r = "</details>")),
    "<style>" +
      e.css +
      "</style>          " +
      i +
      '          <div class="comment-hash-marker" id="' +
      e.id_code +
      '"></div>          <div id="comment-node-' +
      e.id +
      '" class="single-comment-node ' +
      t +
      " comment-deep-" +
      e.depth +
      '" "          data-comment-id="' +
      e.id +
      '" data-comment-author-id="' +
      e.user.id +
      '" data-current-user-comment="' +
      e.newly_created +
      '" data-content-user-id="' +
      e.user.id +
      '">          <div class="inner-comment ' +
      o +
      '">            <div class="details">              <a href="/' +
      e.user.username +
      '">                <img class="profile-pic" src="' +
      e.user.profile_pic +
      '" alt="' +
      e.user.username +
      '">                <span class="comment-username"><span class="comment-username-inner">' +
      e.user.name +
      "</span></span>              </a>                " +
      a +
      "                " +
      n +
      '              <div class="comment-date">                <a href="' +
      e.url +
      '">                  <time datetime="' +
      e.published_timestamp +
      '">                    ' +
      e.readable_publish_date +
      '                  </time>                </a>              </div>              <button class="dropbtn">                <img class="dropdown-icon" alt="Toggle dropdown menu" src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/overflow-horizontal-7a243cb5137329ddcc6343e87bf32ccf344eed3af8e33803a6a07cefa7d1e974.svg" />              </button>              <div class="dropdown">                  <div class="crayons-dropdown p-1 z-30 right-1 left-1 s:right-0 s:left-auto fs-base">                    <a href="' +
      e.url +
      '" class="crayons-link crayons-link--block">                      Permalink                    </a>                    <a href="' +
      e.url +
      '/settings" class="crayons-link crayons-link--block">                      Settings                    </a>                    <a href="/report-abuse?url=' +
      e.url +
      '" class="crayons-link crayons-link--block">Report Abuse</a>                  </div>              </div>            </div>            <div class="body">              ' +
      e.body_html +
      "              " +
      reactions(e) +
      "            </div>            " +
      actions(e) +
      "          </div>      </div>      " +
      r
  );
}
function actions(e) {
  return e.newly_created
    ? '<div class="actions" data-comment-id="' +
        e.id +
        '" data-path="' +
        e.url +
        '">              <span class="current-user-actions" style="display: ' +
        (e.newly_created ? "inline-block" : "none") +
        ';">                <a data-no-instant="" href="' +
        e.url +
        '/delete_confirm" class="edit-butt" rel="nofollow">DELETE</a>                <a href="' +
        e.url +
        '/edit" class="edit-butt" rel="nofollow">EDIT</a>              </span>                <a href="#" class="toggle-reply-form" rel="nofollow">Reply</a>            </div>'
    : '<div class="actions" data-comment-id="' +
        e.id +
        '" data-path="' +
        e.url +
        '" data-commentable-id="' +
        e.commentable.id +
        '">                <a href="' +
        e.url +
        '" rel="nofollow">VIEW/REPLY</a>            </div>';
}
function reactions(e) {
  if (e.newly_created)
    return (
      '<button class="reaction-button reacted" id="button-for-comment-' +
      e.id +
      '" data-comment-id="' +
      e.id +
      '">              <img src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/favorite-heart-outline-button-0e707584abc59ba8dfe82cacff79233a8e1cb9791379a4d9715bd8318e72eb6b.svg" alt="Favorite heart outline button">              <img class="voted-heart" src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/emoji/emoji-one-heart-f5a59d5d1b6cfe4e2c956c0ed63cd644820683dcd5c5a051d810fa6efe67a6ce.png" alt="Favorite heart button">              <span class="reactions-count" id="reactions-count-' +
      e.id +
      '">1</span></button>'
    );
  if (e.heart_ids.indexOf(userData().id) > -1) var t = "reacted";
  else t = "";
  return (
    '<button style="background:white" class="reaction-button ' +
    t +
    '" id="button-for-comment-' +
    e.id +
    '" data-comment-id="' +
    e.id +
    '">              <img src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/favorite-heart-outline-button-0e707584abc59ba8dfe82cacff79233a8e1cb9791379a4d9715bd8318e72eb6b.svg" alt="Favorite heart outline button">              <img class="voted-heart" src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/emoji/emoji-one-heart-f5a59d5d1b6cfe4e2c956c0ed63cd644820683dcd5c5a051d810fa6efe67a6ce.png" alt="Favorite heart button">              <span class="reactions-count" id="reactions-count-' +
    e.id +
    '">' +
    e.public_reactions_count +
    "</span></button>"
  );
}
function checkUserLoggedIn() {
  const e = document.body;
  return !!e && "logged-in" === e.getAttribute("data-user-status");
}
function dynamicallyLoadScript(e) {
  if (document.querySelector(`script[src='${e}']`)) return;
  const t = document.createElement("script");
  (t.src = e), document.head.appendChild(t);
}
function getCsrfToken() {
  return new Promise(function (e, t) {
    var n = 0,
      a = setInterval(function () {
        var o = document.querySelector("meta[name='csrf-token']");
        if (((n += 1), o)) {
          clearInterval(a);
          var i = o.getAttribute("content");
          return e(i);
        }
        if (1e3 === n)
          return (
            clearInterval(a),
            Honeybadger.notify(
              "Could not locate CSRF metatag " +
                JSON.stringify(localStorage.current_user)
            ),
            t(new Error("Could not locate CSRF meta tag on the page."))
          );
      }, 5);
  });
}
function getCurrentPage(e) {
  return (
    document.querySelectorAll("[data-current-page='" + e + "']").length > 0
  );
}
function getImageForLink(e) {
  var t = e.getAttribute("data-preload-image");
  t &&
    -1 === $fetchedImageUrls.indexOf(t) &&
    ((new Image().src = t), $fetchedImageUrls.push(t));
}
function insertAfter(e, t) {
  t && t.parentNode && t.parentNode.insertBefore(e, t.nextSibling);
}
function timestampToLocalDateTime(e, t, n) {
  if (!e) return "";
  try {
    var a = new Date(e);
    return new Intl.DateTimeFormat(t || "default", n).format(a);
  } catch (o) {
    return "";
  }
}
function addLocalizedDateTimeToElementsTitles(e, t) {
  for (var n = 0; n < e.length; n += 1) {
    var a = e[n],
      o = a.getAttribute(t || "datetime");
    if (o) {
      var i = timestampToLocalDateTimeLong(o);
      a.setAttribute("title", i);
    }
  }
}
function localizeTimeElements(e, t) {
  for (let n = 0; n < e.length; n += 1) {
    const a = e[n],
      o = a.getAttribute("datetime");
    if (o) {
      const e = timestampToLocalDateTime(o, navigator.language, t);
      a.textContent = e;
    }
  }
}
function timestampToLocalDateTimeLong(e) {
  return timestampToLocalDateTime(e, navigator.language, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}
function timestampToLocalDateTimeShort(e) {
  if (e) {
    const n = new Date().getFullYear();
    var t = { day: "numeric", month: "short" };
    return (
      new Date(e).getFullYear() !== n && (t.year = "numeric"),
      timestampToLocalDateTime(e, navigator.language, t)
    );
  }
  return "";
}
function localStorageTest() {
  var e = "devtolocalstoragetestforavaialbility";
  try {
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch (t) {
    return !1;
  }
}
function preventDefaultAction(e) {
  e.preventDefault();
}
function sendFetch(e, t) {
  switch (e) {
    case "article-preview":
      return fetchCallback({
        url: "https://dev.to/articles/preview",
        headers: {
          Accept: "application/json",
        },
        body: t,
      });
    case "reaction-creation":
      return fetchCallback({ url: "/reactions", addTokenToBody: !0, body: t });
    case "image-upload":
      return fetchCallback({
        url: "/image_uploads",
        addTokenToBody: !0,
        body: t,
      });
    case "follow-creation":
      return fetchCallback({ url: "/follows", addTokenToBody: !0, body: t });
    case "chat-creation":
      return fetchCallback({
        url: "/chat_channels/create_chat",
        addTokenToBody: !0,
        body: t,
      });
    case "block-user":
      return fetchCallback({
        url: "/user_blocks",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        addTokenToBody: !1,
        body: t,
      });
    case "comment-creation":
      return fetchCallback({
        url: "/comments",
        headers: { "Content-Type": "application/json" },
        body: t,
      });
    case "comment-preview":
      return fetchCallback({
        url: "/comments/preview",
        headers: { "Content-Type": "application/json" },
        body: t,
      });
    default:
      console.log("A wrong switchStatement was used.");
  }
  return !0;
}
function sendHapticMessage(e) {
  try {
    window &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.haptic &&
      window.webkit.messageHandlers.haptic.postMessage(e);
  } catch (t) {
    console.log(t.message);
  }
}
function initSignupModal() {
  document.getElementById("global-signup-modal") &&
    (document.querySelector(
      ".authentication-modal__close-btn"
    ).onclick = () => {
      document.getElementById("global-signup-modal").classList.add("hidden"),
        document.body.classList.remove("modal-open");
    });
}
function showModal() {
  document.getElementById("global-signup-modal").classList.remove("hidden"),
    document.body.classList.add("modal-open"),
    initSignupModal();
}
function showUserAlertModal(e, t, n) {
  buildModalDiv(e, t, n);
  toggleUserAlertModal();
}
function showRateLimitModal(e, t) {
  showUserAlertModal(
    "Wait a Moment...",
    buildRateLimitText(e, t),
    "Got it",
    "/faq",
    "Why do I have to wait?"
  );
}
function buildRateLimitText(e, t) {
  return `Since you recently ${e}, you\u2019ll need to wait a moment before ${t}.`;
}
function toggleUserAlertModal() {
  let e = document.getElementById(modalId);
  e && e.classList.toggle("hidden");
}
function buildModalDiv(e, t, n) {
  let a = document.getElementById(modalId);
  return a || ((a = getModal(e, t, n)), document.body.appendChild(a)), a;
}
function getModal(e, t, n) {
  let a = document.createElement("div");
  return (a.innerHTML = getModalHtml(e, t, n)), a.firstChild;
}
function slideSidebar(e, t) {
  document.getElementById("sidebar-wrapper-" + e) &&
    ("intoView" === t
      ? (document.getElementById("articles-list").classList.add("modal-open"),
        document.body.classList.add("modal-open"),
        document
          .getElementById("sidebar-wrapper-" + e)
          .classList.add("swiped-in"),
        document
          .getElementById("articles-list")
          .addEventListener("touchmove", preventDefaultAction, !1))
      : (document
          .getElementById("articles-list")
          .classList.remove("modal-open"),
        document.body.classList.remove("modal-open"),
        (document
          .getElementById("sidebar-wrapper-" + e)
          .querySelector(".side-bar").scrollTop = 0),
        document
          .getElementById("sidebar-wrapper-" + e)
          .classList.remove("swiped-in"),
        document
          .getElementById("articles-list")
          .removeEventListener("touchmove", preventDefaultAction, !1)));
}
function secondsToHumanUnitAgo(e) {
  const t = [
    ["second", 1],
    ["min", 60],
    ["hour", 3600],
    ["day", 86400],
    ["week", 604800],
    ["month", 2592e3],
    ["year", 31536e3],
  ];
  if (e < t[0][1]) return "just now";
  let n = 0;
  for (; n + 1 < t.length && e >= t[n + 1][1]; ) n += 1;
  const a = Math.floor(e / t[n][1]);
  return a + " " + (t[n][0] + (1 === a ? "" : "s")) + " ago";
}
function timeAgo({
  oldTimeInSeconds: e,
  formatter: t = (e) => `<span class="time-ago-indicator">(${e})</span>`,
  maxDisplayedAge: n = 86399,
}) {
  const a = new Date() / 1e3,
    o = Math.round(a - e);
  return o > n ? "" : t(secondsToHumanUnitAgo(o));
}
function userData() {
  const { user: e = null } = document.body.dataset;
  return JSON.parse(e);
}
function callInitializers() {
  initializeLocalStorageRender(), initializeBodyData();
  var e = setInterval(function () {
    "true" === document.body.getAttribute("data-loaded") &&
      (clearInterval(e),
      "logged-in" === document.body.getAttribute("data-user-status") &&
        (initializeBaseUserData(),
        initializeAllChatButtons(),
        initializeAllTagEditButtons()),
      initializeBroadcast(),
      initializeAllFollowButts(),
      initializeUserFollowButts(),
      initializeReadingListIcons(),
      initializeSponsorshipVisibility(),
      document.getElementById("sidebar-additional") &&
        document.getElementById("sidebar-additional").classList.add("showing"));
  }, 1);
  initializeSpecialNavigationFunctionality(),
    initializeBaseTracking(),
    initializePaymentPointers(),
    initializeTouchDevice(),
    initializeCommentsPage(),
    initializeArticleDate(),
    initializeArticleReactions(),
    initNotifications(),
    initializeCommentDate(),
    initializeCommentDropdown(),
    initializeSettings(),
    initializeCommentPreview(),
    initializeTimeFixer(),
    initializeDashboardSort(),
    initializePWAFunctionality(),
    initializeEllipsisMenu(),
    initializeArchivedPostFilter(),
    initializeCreditsPage(),
    initializeUserProfilePage(),
    initializePodcastPlayback(),
    initializeVideoPlayback(),
    initializeDrawerSliders(),
    initializeHeroBannerClose(),
    initializeOnboardingTaskCard(),
    initializeDateHelpers(),
    (nextPage = 0),
    (fetching = !1),
    (done = !1),
    (adClicked = !1),
    setTimeout(function () {
      done = !1;
    }, 300),
    initScrolling.called || initScrolling();
}
function initializePage() {
  initializeLocalStorageRender(), callInitializers();
}
function initializeBaseApp() {
  InstantClick.on("change", function () {
    initializePage();
  }),
    InstantClick.init();
}
var client,
  KEY_CODE_B = 66,
  KEY_CODE_I = 73,
  KEY_CODE_K = 75,
  ENTER_KEY_CODE = 13,
  audioInitialized = !1;
class Runtime {
  static isNativeIOS(e = null) {
    const t =
      /DEV-Native-ios|ForemWebView/i.test(navigator.userAgent) &&
      window &&
      window.webkit &&
      window.webkit.messageHandlers;
    let n = !0;
    return (
      t && e && (n = window.webkit.messageHandlers[e] != undefined), t && n
    );
  }
  static isNativeAndroid(e = null) {
    const t =
      /DEV-Native-android|ForemWebView/i.test(navigator.userAgent) &&
      AndroidBridge != undefined;
    let n = !0;
    return t && e && (n = AndroidBridge[e] != undefined), t && n;
  }
  static copyToClipboard(e) {
    return new Promise((t, n) => {
      Runtime.isNativeAndroid("copyToClipboard")
        ? (AndroidBridge.copyToClipboard(e), t())
        : null != navigator.clipboard
        ? navigator.clipboard
            .writeText(e)
            .then(() => {
              t();
            })
            ["catch"]((e) => {
              n(e);
            })
        : n("Unsupported device unable to copy to clipboard");
    });
  }
}
var $fetchedImageUrls = [];
"undefined" != typeof globalThis &&
  ((globalThis.timestampToLocalDateTimeLong = timestampToLocalDateTimeLong),
  (globalThis.timestampToLocalDateTimeShort = timestampToLocalDateTimeShort));
const fetchCallback = ({
    url: e,
    headers: t = {},
    addTokenToBody: n = !1,
    body: a,
  }) => (o) => (
    n && a.append("authenticity_token", o),
    window.fetch(e, {
      method: "POST",
      headers: { "X-CSRF-Token": o, ...t },
      body: a,
      credentials: "same-origin",
    })
  ),
  modalId = "user-alert-modal",
  getModalHtml = (e, t, n) =>
    `<div id="${modalId}" data-testid="modal-container" class="crayons-modal hidden">\n    <div role="dialog" aria-modal="true" class="crayons-modal__box">\n      <div class="crayons-modal__box__header">\n        <h2>${e}</h2>\n          <button class="crayons-btn crayons-btn--ghost crayons-btn--icon" type="button" \n              onClick="toggleUserAlertModal();" aria-label="Close">\n            <svg width="24" height="24" viewBox="0 0 24 24" class="crayons-icon"\n              xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="714d29e78a3867c79b07f310e075e824">\n              <title id="714d29e78a3867c79b07f310e075e824">Close</title>\n              <path\n                d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z">\n              </path>\n            </svg>\n          </button>\n      </div>\n      <div class="crayons-modal__box__body">\n        <p>${t}</p>\n        </br>\n        <button class="crayons-btn crayons-btn--icon" type="button" onClick="toggleUserAlertModal();">${n}</button>\n      </div>\n    </div>\n    <div data-testid="modal-overlay" class="crayons-modal__overlay"></div>\n  </div>\n`;
"undefined" != typeof globalThis && (globalThis.timeAgo = timeAgo),
  (function e(t, n, a) {
    function o(r, s) {
      if (!n[r]) {
        if (!t[r]) {
          var c = "function" == typeof require && require;
          if (!s && c) return c(r, !0);
          if (i) return i(r, !0);
          var l = new Error("Cannot find module '" + r + "'");
          throw ((l.code = "MODULE_NOT_FOUND"), l);
        }
        var d = (n[r] = { exports: {} });
        t[r][0].call(
          d.exports,
          function (e) {
            var n = t[r][1][e];
            return o(n || e);
          },
          d,
          d.exports,
          e,
          t,
          n,
          a
        );
      }
      return n[r].exports;
    }
    for (
      var i = "function" == typeof require && require, r = 0;
      r < a.length;
      r++
    )
      o(a[r]);
    return o;
  })(
    {
      1: [
        function (e, t, n) {
          function a() {
            return {};
          }
          function o() {}
          function i() {}
          function r() {}
          function s() {}
          function c(e) {
            return e.replace(L, "&lt;").replace(I, "&gt;");
          }
          function l(e, t, n, a) {
            if (((n = p(n)), "href" === t || "src" === t)) {
              if ("#" === (n = E.trim(n))) return "#";
              if (
                "http://" !== n.substr(0, 7) &&
                "https://" !== n.substr(0, 8) &&
                "mailto:" !== n.substr(0, 7) &&
                "#" !== n[0] &&
                "/" !== n[0]
              )
                return "";
            } else if ("background" === t) {
              if (((M.lastIndex = 0), M.test(n))) return "";
            } else if ("style" === t) {
              if (((N.lastIndex = 0), N.test(n))) return "";
              if (
                ((H.lastIndex = 0), H.test(n) && ((M.lastIndex = 0), M.test(n)))
              )
                return "";
              !1 !== a && (n = (a = a || T).process(n));
            }
            return (n = h(n));
          }
          function d(e) {
            return e.replace(B, "&quot;");
          }
          function u(e) {
            return e.replace(S, '"');
          }
          function m(e) {
            return e.replace(x, function (e, t) {
              return "x" === t[0] || "X" === t[0]
                ? String.fromCharCode(parseInt(t.substr(1), 16))
                : String.fromCharCode(parseInt(t, 10));
            });
          }
          function f(e) {
            return e.replace(C, ":").replace(A, " ");
          }
          function g(e) {
            for (var t = "", n = 0, a = e.length; n < a; n++)
              t += e.charCodeAt(n) < 32 ? " " : e.charAt(n);
            return E.trim(t);
          }
          function p(e) {
            return (e = g((e = f((e = m((e = u(e))))))));
          }
          function h(e) {
            return (e = c((e = d(e))));
          }
          function y() {
            return "";
          }
          function v(e, t) {
            function n(t) {
              return !!a || -1 !== E.indexOf(e, t);
            }
            "function" != typeof t && (t = function () {});
            var a = !Array.isArray(e),
              o = [],
              i = !1;
            return {
              onIgnoreTag: function (e, a, r) {
                if (n(e)) {
                  if (r.isClosing) {
                    var s = "[/removed]",
                      c = r.position + s.length;
                    return o.push([!1 !== i ? i : r.position, c]), (i = !1), s;
                  }
                  return i || (i = r.position), "[removed]";
                }
                return t(e, a, r);
              },
              remove: function (e) {
                var t = "",
                  n = 0;
                return (
                  E.forEach(o, function (a) {
                    (t += e.slice(n, a[0])), (n = a[1]);
                  }),
                  (t += e.slice(n))
                );
              },
            };
          }
          function b(e) {
            return e.replace(R, "");
          }
          function w(e) {
            var t = e.split("");
            return (t = t.filter(function (e) {
              var t = e.charCodeAt(0);
              return 127 !== t && (!(t <= 31) || 10 === t || 13 === t);
            })).join("");
          }
          var k = e("cssfilter").FilterCSS,
            _ = e("cssfilter").getDefaultWhiteList,
            E = e("./util"),
            T = new k(),
            L = /</g,
            I = />/g,
            B = /"/g,
            S = /&quot;/g,
            x = /&#([a-zA-Z0-9]*);?/gim,
            C = /&colon;?/gim,
            A = /&newline;?/gim,
            M = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi,
            N = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,
            H = /u\s*r\s*l\s*\(.*/gi,
            R = /<!--[\s\S]*?-->/g;
          (n.whiteList = a()),
            (n.getDefaultWhiteList = a),
            (n.onTag = o),
            (n.onIgnoreTag = i),
            (n.onTagAttr = r),
            (n.onIgnoreTagAttr = s),
            (n.safeAttrValue = l),
            (n.escapeHtml = c),
            (n.escapeQuote = d),
            (n.unescapeQuote = u),
            (n.escapeHtmlEntities = m),
            (n.escapeDangerHtml5Entities = f),
            (n.clearNonPrintableCharacter = g),
            (n.friendlyAttrValue = p),
            (n.escapeAttrValue = h),
            (n.onIgnoreTagStripAll = y),
            (n.StripTagBody = v),
            (n.stripCommentTag = b),
            (n.stripBlankChar = w),
            (n.cssFilter = T),
            (n.getDefaultCSSWhiteList = _);
        },
        { "./util": 4, cssfilter: 8 },
      ],
      2: [
        function (e, t, n) {
          function a(e, t) {
            return new r(t).process(e);
          }
          var o = e("./default"),
            i = e("./parser"),
            r = e("./xss");
          for (var s in (((n = t.exports = a).FilterXSS = r), o)) n[s] = o[s];
          for (var s in i) n[s] = i[s];
          "undefined" != typeof window && (window.filterXSS = t.exports);
        },
        { "./default": 1, "./parser": 3, "./xss": 5 },
      ],
      3: [
        function (e, t, n) {
          function a(e) {
            var t = e.indexOf(" ");
            if (-1 === t) var n = e.slice(1, -1);
            else n = e.slice(1, t + 1);
            return (
              "/" === (n = u.trim(n).toLowerCase()).slice(0, 1) &&
                (n = n.slice(1)),
              "/" === n.slice(-1) && (n = n.slice(0, -1)),
              n
            );
          }
          function o(e) {
            return "</" === e.slice(0, 2);
          }
          function i(e, t, n) {
            "user strict";
            var i = "",
              r = 0,
              s = !1,
              c = !1,
              l = 0,
              d = e.length,
              u = "",
              m = "";
            for (l = 0; l < d; l++) {
              var f = e.charAt(l);
              if (!1 === s) {
                if ("<" === f) {
                  s = l;
                  continue;
                }
              } else if (!1 === c) {
                if ("<" === f) {
                  (i += n(e.slice(r, l))), (s = l), (r = l);
                  continue;
                }
                if (">" === f) {
                  (i += n(e.slice(r, s))),
                    (m = a((u = e.slice(s, l + 1)))),
                    (i += t(s, i.length, m, u, o(u))),
                    (r = l + 1),
                    (s = !1);
                  continue;
                }
                if (('"' === f || "'" === f) && "=" === e.charAt(l - 1)) {
                  c = f;
                  continue;
                }
              } else if (f === c) {
                c = !1;
                continue;
              }
            }
            return r < e.length && (i += n(e.substr(r))), i;
          }
          function r(e, t) {
            "user strict";
            function n(e, n) {
              if (
                !((e = (e = u.trim(e)).replace(m, "").toLowerCase()).length < 1)
              ) {
                var a = t(e, n || "");
                a && o.push(a);
              }
            }
            for (var a = 0, o = [], i = !1, r = e.length, l = 0; l < r; l++) {
              var f,
                g = e.charAt(l);
              if (!1 !== i || "=" !== g)
                if (
                  !1 === i ||
                  l !== a ||
                  ('"' !== g && "'" !== g) ||
                  "=" !== e.charAt(l - 1)
                )
                  if (" " !== g);
                  else {
                    if (!1 === i) {
                      if (-1 === (f = s(e, l))) {
                        n(u.trim(e.slice(a, l))), (i = !1), (a = l + 1);
                        continue;
                      }
                      l = f - 1;
                      continue;
                    }
                    if (-1 === (f = c(e, l - 1))) {
                      n(i, d(u.trim(e.slice(a, l)))), (i = !1), (a = l + 1);
                      continue;
                    }
                  }
                else {
                  if (-1 === (f = e.indexOf(g, l + 1))) break;
                  n(i, u.trim(e.slice(a + 1, f))), (i = !1), (a = (l = f) + 1);
                }
              else (i = e.slice(a, l)), (a = l + 1);
            }
            return (
              a < e.length &&
                (!1 === i ? n(e.slice(a)) : n(i, d(u.trim(e.slice(a))))),
              u.trim(o.join(" "))
            );
          }
          function s(e, t) {
            for (; t < e.length; t++) {
              var n = e[t];
              if (" " !== n) return "=" === n ? t : -1;
            }
          }
          function c(e, t) {
            for (; t > 0; t--) {
              var n = e[t];
              if (" " !== n) return "=" === n ? t : -1;
            }
          }
          function l(e) {
            return (
              ('"' === e[0] && '"' === e[e.length - 1]) ||
              ("'" === e[0] && "'" === e[e.length - 1])
            );
          }
          function d(e) {
            return l(e) ? e.substr(1, e.length - 2) : e;
          }
          var u = e("./util"),
            m = /[^a-zA-Z0-9_:\.\-]/gim;
          (n.parseTag = i), (n.parseAttr = r);
        },
        { "./util": 4 },
      ],
      4: [
        function (e, t) {
          t.exports = {
            indexOf: function (e, t) {
              var n, a;
              if (Array.prototype.indexOf) return e.indexOf(t);
              for (n = 0, a = e.length; n < a; n++) if (e[n] === t) return n;
              return -1;
            },
            forEach: function (e, t, n) {
              var a, o;
              if (Array.prototype.forEach) return e.forEach(t, n);
              for (a = 0, o = e.length; a < o; a++) t.call(n, e[a], a, e);
            },
            trim: function (e) {
              return String.prototype.trim
                ? e.trim()
                : e.replace(/(^\s*)|(\s*$)/g, "");
            },
          };
        },
        {},
      ],
      5: [
        function (e, t) {
          function n(e) {
            return e === undefined || null === e;
          }
          function a(e) {
            var t = e.indexOf(" ");
            if (-1 === t) return { html: "", closing: "/" === e[e.length - 2] };
            var n = "/" === (e = u.trim(e.slice(t + 1, -1)))[e.length - 1];
            return n && (e = u.trim(e.slice(0, -1))), { html: e, closing: n };
          }
          function o(e) {
            var t = {};
            for (var n in e) t[n] = e[n];
            return t;
          }
          function i(e) {
            (e = o(e || {})).stripIgnoreTag &&
              (e.onIgnoreTag &&
                console.error(
                  'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
                ),
              (e.onIgnoreTag = s.onIgnoreTagStripAll)),
              (e.whiteList = e.whiteList || s.whiteList),
              (e.onTag = e.onTag || s.onTag),
              (e.onTagAttr = e.onTagAttr || s.onTagAttr),
              (e.onIgnoreTag = e.onIgnoreTag || s.onIgnoreTag),
              (e.onIgnoreTagAttr = e.onIgnoreTagAttr || s.onIgnoreTagAttr),
              (e.safeAttrValue = e.safeAttrValue || s.safeAttrValue),
              (e.escapeHtml = e.escapeHtml || s.escapeHtml),
              (this.options = e),
              !1 === e.css
                ? (this.cssFilter = !1)
                : ((e.css = e.css || {}), (this.cssFilter = new r(e.css)));
          }
          var r = e("cssfilter").FilterCSS,
            s = e("./default"),
            c = e("./parser"),
            l = c.parseTag,
            d = c.parseAttr,
            u = e("./util");
          (i.prototype.process = function (e) {
            if (!(e = (e = e || "").toString())) return "";
            var t = this,
              o = t.options,
              i = o.whiteList,
              r = o.onTag,
              c = o.onIgnoreTag,
              m = o.onTagAttr,
              f = o.onIgnoreTagAttr,
              g = o.safeAttrValue,
              p = o.escapeHtml,
              h = t.cssFilter;
            o.stripBlankChar && (e = s.stripBlankChar(e)),
              o.allowCommentTag || (e = s.stripCommentTag(e));
            var y = !1;
            if (o.stripIgnoreTagBody) {
              y = s.StripTagBody(o.stripIgnoreTagBody, c);
              c = y.onIgnoreTag;
            }
            var v = l(
              e,
              function (e, t, o, s, l) {
                var y,
                  v = {
                    sourcePosition: e,
                    position: t,
                    isClosing: l,
                    isWhite: o in i,
                  };
                if (!n((y = r(o, s, v)))) return y;
                if (v.isWhite) {
                  if (v.isClosing) return "</" + o + ">";
                  var b = a(s),
                    w = i[o],
                    k = d(b.html, function (e, t) {
                      var a,
                        i = -1 !== u.indexOf(w, e);
                      return n((a = m(o, e, t, i)))
                        ? i
                          ? (t = g(o, e, t, h))
                            ? e + '="' + t + '"'
                            : e
                          : n((a = f(o, e, t, i)))
                          ? void 0
                          : a
                        : a;
                    });
                  s = "<" + o;
                  return (
                    k && (s += " " + k), b.closing && (s += " /"), (s += ">")
                  );
                }
                return n((y = c(o, s, v))) ? p(s) : y;
              },
              p
            );
            return y && (v = y.remove(v)), v;
          }),
            (t.exports = i);
        },
        { "./default": 1, "./parser": 3, "./util": 4, cssfilter: 8 },
      ],
      6: [
        function (e, t) {
          function n(e) {
            return e === undefined || null === e;
          }
          function a(e) {
            var t = {};
            for (var n in e) t[n] = e[n];
            return t;
          }
          function o(e) {
            ((e = a(e || {})).whiteList = e.whiteList || i.whiteList),
              (e.onAttr = e.onAttr || i.onAttr),
              (e.onIgnoreAttr = e.onIgnoreAttr || i.onIgnoreAttr),
              (this.options = e);
          }
          var i = e("./default"),
            r = e("./parser");
          e("./util");
          (o.prototype.process = function (e) {
            if (!(e = (e = e || "").toString())) return "";
            var t = this.options,
              a = t.whiteList,
              o = t.onAttr,
              i = t.onIgnoreAttr;
            return r(e, function (e, t, r, s, c) {
              var l = a[r],
                d = !1;
              !0 === l
                ? (d = l)
                : "function" == typeof l
                ? (d = l(s))
                : l instanceof RegExp && (d = l.test(s)),
                !0 !== d && (d = !1);
              var u,
                m = { position: t, sourcePosition: e, source: c, isWhite: d };
              return d
                ? n((u = o(r, s, m)))
                  ? r + ":" + s
                  : u
                : n((u = i(r, s, m)))
                ? void 0
                : u;
            });
          }),
            (t.exports = o);
        },
        { "./default": 7, "./parser": 9, "./util": 10 },
      ],
      7: [
        function (e, t, n) {
          function a() {
            var e = {
              "align-content": !1,
              "align-items": !1,
              "align-self": !1,
              "alignment-adjust": !1,
              "alignment-baseline": !1,
              all: !1,
              "anchor-point": !1,
              animation: !1,
              "animation-delay": !1,
              "animation-direction": !1,
              "animation-duration": !1,
              "animation-fill-mode": !1,
              "animation-iteration-count": !1,
              "animation-name": !1,
              "animation-play-state": !1,
              "animation-timing-function": !1,
              azimuth: !1,
              "backface-visibility": !1,
              background: !0,
              "background-attachment": !0,
              "background-clip": !0,
              "background-color": !0,
              "background-image": !0,
              "background-origin": !0,
              "background-position": !0,
              "background-repeat": !0,
              "background-size": !0,
              "baseline-shift": !1,
              binding: !1,
              bleed: !1,
              "bookmark-label": !1,
              "bookmark-level": !1,
              "bookmark-state": !1,
              border: !0,
              "border-bottom": !0,
              "border-bottom-color": !0,
              "border-bottom-left-radius": !0,
              "border-bottom-right-radius": !0,
              "border-bottom-style": !0,
              "border-bottom-width": !0,
              "border-collapse": !0,
              "border-color": !0,
              "border-image": !0,
              "border-image-outset": !0,
              "border-image-repeat": !0,
              "border-image-slice": !0,
              "border-image-source": !0,
              "border-image-width": !0,
              "border-left": !0,
              "border-left-color": !0,
              "border-left-style": !0,
              "border-left-width": !0,
              "border-radius": !0,
              "border-right": !0,
              "border-right-color": !0,
              "border-right-style": !0,
              "border-right-width": !0,
              "border-spacing": !0,
              "border-style": !0,
              "border-top": !0,
              "border-top-color": !0,
              "border-top-left-radius": !0,
              "border-top-right-radius": !0,
              "border-top-style": !0,
              "border-top-width": !0,
              "border-width": !0,
              bottom: !1,
              "box-decoration-break": !0,
              "box-shadow": !0,
              "box-sizing": !0,
              "box-snap": !0,
              "box-suppress": !0,
              "break-after": !0,
              "break-before": !0,
              "break-inside": !0,
              "caption-side": !1,
              chains: !1,
              clear: !0,
              clip: !1,
              "clip-path": !1,
              "clip-rule": !1,
              color: !0,
              "color-interpolation-filters": !0,
              "column-count": !1,
              "column-fill": !1,
              "column-gap": !1,
              "column-rule": !1,
              "column-rule-color": !1,
              "column-rule-style": !1,
              "column-rule-width": !1,
              "column-span": !1,
              "column-width": !1,
              columns: !1,
              contain: !1,
              content: !1,
              "counter-increment": !1,
              "counter-reset": !1,
              "counter-set": !1,
              crop: !1,
              cue: !1,
              "cue-after": !1,
              "cue-before": !1,
              cursor: !1,
              direction: !1,
              display: !0,
              "display-inside": !0,
              "display-list": !0,
              "display-outside": !0,
              "dominant-baseline": !1,
              elevation: !1,
              "empty-cells": !1,
              filter: !1,
              flex: !1,
              "flex-basis": !1,
              "flex-direction": !1,
              "flex-flow": !1,
              "flex-grow": !1,
              "flex-shrink": !1,
              "flex-wrap": !1,
              float: !1,
              "float-offset": !1,
              "flood-color": !1,
              "flood-opacity": !1,
              "flow-from": !1,
              "flow-into": !1,
              font: !0,
              "font-family": !0,
              "font-feature-settings": !0,
              "font-kerning": !0,
              "font-language-override": !0,
              "font-size": !0,
              "font-size-adjust": !0,
              "font-stretch": !0,
              "font-style": !0,
              "font-synthesis": !0,
              "font-variant": !0,
              "font-variant-alternates": !0,
              "font-variant-caps": !0,
              "font-variant-east-asian": !0,
              "font-variant-ligatures": !0,
              "font-variant-numeric": !0,
              "font-variant-position": !0,
              "font-weight": !0,
              grid: !1,
              "grid-area": !1,
              "grid-auto-columns": !1,
              "grid-auto-flow": !1,
              "grid-auto-rows": !1,
              "grid-column": !1,
              "grid-column-end": !1,
              "grid-column-start": !1,
              "grid-row": !1,
              "grid-row-end": !1,
              "grid-row-start": !1,
              "grid-template": !1,
              "grid-template-areas": !1,
              "grid-template-columns": !1,
              "grid-template-rows": !1,
              "hanging-punctuation": !1,
              height: !0,
              hyphens: !1,
              icon: !1,
              "image-orientation": !1,
              "image-resolution": !1,
              "ime-mode": !1,
              "initial-letters": !1,
              "inline-box-align": !1,
              "justify-content": !1,
              "justify-items": !1,
              "justify-self": !1,
              left: !1,
              "letter-spacing": !0,
              "lighting-color": !0,
              "line-box-contain": !1,
              "line-break": !1,
              "line-grid": !1,
              "line-height": !1,
              "line-snap": !1,
              "line-stacking": !1,
              "line-stacking-ruby": !1,
              "line-stacking-shift": !1,
              "line-stacking-strategy": !1,
              "list-style": !0,
              "list-style-image": !0,
              "list-style-position": !0,
              "list-style-type": !0,
              margin: !0,
              "margin-bottom": !0,
              "margin-left": !0,
              "margin-right": !0,
              "margin-top": !0,
              "marker-offset": !1,
              "marker-side": !1,
              marks: !1,
              mask: !1,
              "mask-box": !1,
              "mask-box-outset": !1,
              "mask-box-repeat": !1,
              "mask-box-slice": !1,
              "mask-box-source": !1,
              "mask-box-width": !1,
              "mask-clip": !1,
              "mask-image": !1,
              "mask-origin": !1,
              "mask-position": !1,
              "mask-repeat": !1,
              "mask-size": !1,
              "mask-source-type": !1,
              "mask-type": !1,
              "max-height": !0,
              "max-lines": !1,
              "max-width": !0,
              "min-height": !0,
              "min-width": !0,
              "move-to": !1,
              "nav-down": !1,
              "nav-index": !1,
              "nav-left": !1,
              "nav-right": !1,
              "nav-up": !1,
              "object-fit": !1,
              "object-position": !1,
              opacity: !1,
              order: !1,
              orphans: !1,
              outline: !1,
              "outline-color": !1,
              "outline-offset": !1,
              "outline-style": !1,
              "outline-width": !1,
              overflow: !1,
              "overflow-wrap": !1,
              "overflow-x": !1,
              "overflow-y": !1,
              padding: !0,
              "padding-bottom": !0,
              "padding-left": !0,
              "padding-right": !0,
              "padding-top": !0,
              page: !1,
              "page-break-after": !1,
              "page-break-before": !1,
              "page-break-inside": !1,
              "page-policy": !1,
              pause: !1,
              "pause-after": !1,
              "pause-before": !1,
              perspective: !1,
              "perspective-origin": !1,
              pitch: !1,
              "pitch-range": !1,
              "play-during": !1,
              position: !1,
              "presentation-level": !1,
              quotes: !1,
              "region-fragment": !1,
              resize: !1,
              rest: !1,
              "rest-after": !1,
              "rest-before": !1,
              richness: !1,
              right: !1,
              rotation: !1,
              "rotation-point": !1,
              "ruby-align": !1,
              "ruby-merge": !1,
              "ruby-position": !1,
              "shape-image-threshold": !1,
              "shape-outside": !1,
              "shape-margin": !1,
              size: !1,
              speak: !1,
              "speak-as": !1,
              "speak-header": !1,
              "speak-numeral": !1,
              "speak-punctuation": !1,
              "speech-rate": !1,
              stress: !1,
              "string-set": !1,
              "tab-size": !1,
              "table-layout": !1,
              "text-align": !0,
              "text-align-last": !0,
              "text-combine-upright": !0,
              "text-decoration": !0,
              "text-decoration-color": !0,
              "text-decoration-line": !0,
              "text-decoration-skip": !0,
              "text-decoration-style": !0,
              "text-emphasis": !0,
              "text-emphasis-color": !0,
              "text-emphasis-position": !0,
              "text-emphasis-style": !0,
              "text-height": !0,
              "text-indent": !0,
              "text-justify": !0,
              "text-orientation": !0,
              "text-overflow": !0,
              "text-shadow": !0,
              "text-space-collapse": !0,
              "text-transform": !0,
              "text-underline-position": !0,
              "text-wrap": !0,
              top: !1,
              transform: !1,
              "transform-origin": !1,
              "transform-style": !1,
              transition: !1,
              "transition-delay": !1,
              "transition-duration": !1,
              "transition-property": !1,
              "transition-timing-function": !1,
              "unicode-bidi": !1,
              "vertical-align": !1,
              visibility: !1,
              "voice-balance": !1,
              "voice-duration": !1,
              "voice-family": !1,
              "voice-pitch": !1,
              "voice-range": !1,
              "voice-rate": !1,
              "voice-stress": !1,
              "voice-volume": !1,
              volume: !1,
              "white-space": !1,
              widows: !1,
              width: !0,
              "will-change": !1,
              "word-break": !0,
              "word-spacing": !0,
              "word-wrap": !0,
              "wrap-flow": !1,
              "wrap-through": !1,
              "writing-mode": !1,
              "z-index": !1,
            };
            return e;
          }
          function o() {}
          function i() {}
          (n.whiteList = a()),
            (n.getDefaultWhiteList = a),
            (n.onAttr = o),
            (n.onIgnoreAttr = i);
        },
        {},
      ],
      8: [
        function (e, t, n) {
          function a(e, t) {
            return new i(t).process(e);
          }
          var o = e("./default"),
            i = e("./css");
          for (var r in (((n = t.exports = a).FilterCSS = i), o)) n[r] = o[r];
          "undefined" != typeof window && (window.filterCSS = t.exports);
        },
        { "./css": 6, "./default": 7 },
      ],
      9: [
        function (e, t) {
          function n(e, t) {
            function n() {
              if (!i) {
                var n = a.trim(e.slice(r, s)),
                  o = n.indexOf(":");
                if (-1 !== o) {
                  var l = a.trim(n.slice(0, o)),
                    d = a.trim(n.slice(o + 1));
                  if (l) {
                    var u = t(r, c.length, l, d, n);
                    u && (c += u + "; ");
                  }
                }
              }
              r = s + 1;
            }
            ";" !== (e = a.trimRight(e))[e.length - 1] && (e += ";");
            for (var o = e.length, i = !1, r = 0, s = 0, c = ""; s < o; s++) {
              var l = e[s];
              if ("/" === l && "*" === e[s + 1]) {
                var d = e.indexOf("*/", s + 2);
                if (-1 === d) break;
                (r = (s = d + 1) + 1), (i = !1);
              } else
                "(" === l
                  ? (i = !0)
                  : ")" === l
                  ? (i = !1)
                  : ";" === l
                  ? i || n()
                  : "\n" === l && n();
            }
            return a.trim(c);
          }
          var a = e("./util");
          t.exports = n;
        },
        { "./util": 10 },
      ],
      10: [
        function (e, t) {
          t.exports = {
            indexOf: function (e, t) {
              var n, a;
              if (Array.prototype.indexOf) return e.indexOf(t);
              for (n = 0, a = e.length; n < a; n++) if (e[n] === t) return n;
              return -1;
            },
            forEach: function (e, t, n) {
              var a, o;
              if (Array.prototype.forEach) return e.forEach(t, n);
              for (a = 0, o = e.length; a < o; a++) t.call(n, e[a], a, e);
            },
            trim: function (e) {
              return String.prototype.trim
                ? e.trim()
                : e.replace(/(^\s*)|(\s*$)/g, "");
            },
            trimRight: function (e) {
              return String.prototype.trimRight
                ? e.trimRight()
                : e.replace(/(\s*$)/g, "");
            },
          };
        },
        {},
      ],
    },
    {},
    [2]
  ),
  (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e = e || self).Honeybadger = t());
  })(this, function () {
    "use strict";
    function e(t) {
      "@babel/helpers - typeof";
      return (e =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(t);
    }
    function t(t, n) {
      function a(t) {
        if (!t || "object" !== e(t)) return !1;
        for (var n = 0; n < r.length; n++) {
          if (r[n] === t) return !0;
        }
        return r.push(t), !1;
      }
      function o(t) {
        return (
          !/function|symbol/.test(e(t)) &&
          null !== t &&
          ("object" !== e(t) || "undefined" != typeof t.hasOwnProperty)
        );
      }
      function i(t, r) {
        if ((r || (r = 0), r >= n)) return "[DEPTH]";
        if (!o(t)) return Object.prototype.toString.call(t);
        if (a(t)) return "[RECURSION]";
        if (Array.isArray(t))
          return t.map(function (e) {
            return i(e, r + 1);
          });
        if ("object" === e(t)) {
          var s = {};
          for (var c in t) {
            var l = t[c];
            Object.prototype.hasOwnProperty.call(t, c) &&
              null != c &&
              null != l &&
              (s[c] = i(l, r + 1));
          }
          return s;
        }
        return t;
      }
      var r = [];
      return i(t);
    }
    function n(e) {
      if (!e || !e.tagName) return "";
      var t = e.tagName.toLowerCase();
      if ("html" === t) return "";
      e.id && (t += "#".concat(e.id));
      var n = e.getAttribute("class");
      n &&
        n.split(/\s+/).forEach(function (e) {
          t += ".".concat(e);
        }),
        ["alt", "name", "title", "type"].forEach(function (n) {
          var a = e.getAttribute(n);
          a && (t += "[".concat(n, '="').concat(a, '"]'));
        });
      var a = l(e);
      return (
        a.length > 1 &&
          (t += ":nth-child(".concat(
            Array.prototype.indexOf.call(a, e) + 1,
            ")"
          )),
        t
      );
    }
    function a(e) {
      var t = n(e);
      if (e.parentNode && e.parentNode.tagName) {
        var o = a(e.parentNode);
        if (o.length > 0) return "".concat(o, " > ").concat(t);
      }
      return t;
    }
    function o(e) {
      var t = e.textContent || e.innerText || "";
      return (
        t || ("submit" !== e.type && "button" !== e.type) || (t = e.value),
        d(t.trim(), 300)
      );
    }
    function i() {
      if (!window.fetch) return !1;
      if (r(window.fetch)) return !0;
      try {
        var e = document.createElement("iframe");
        (e.style.display = "none"), document.head.appendChild(e);
        var t = e.contentWindow.fetch && r(e.contentWindow.fetch);
        return document.head.removeChild(e), t;
      } catch (n) {
        console &&
          console.warn &&
          console.warn("failed to detect native fetch via iframe: " + n);
      }
      return !1;
    }
    function r(e) {
      return -1 !== e.toString().indexOf("native");
    }
    function s(e) {
      var t =
        e.match(
          /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
        ) || {};
      return { protocol: t[2], host: t[4], pathname: t[5] };
    }
    function c(e) {
      var t = s(e),
        n = s(document.URL);
      return t.host && t.protocol
        ? t.protocol === n.protocol && t.host === n.host
          ? t.pathname
          : "".concat(t.protocol, "://").concat(t.host).concat(t.pathname)
        : t.pathname;
    }
    function l(e) {
      try {
        var t = e.parentNode.childNodes,
          n = [];
        return (
          Array.prototype.forEach.call(t, function (t) {
            t.tagName && t.tagName === e.tagName && n.push(t);
          }),
          n
        );
      } catch (a) {
        return [];
      }
    }
    function d(e, t) {
      return e.length > t && (e = e.substr(0, t) + "..."), e;
    }
    function u() {
      function r(e, t) {
        var n = {};
        for (var a in e) n[a] = e[a];
        for (var a in t) n[a] = t[a];
        return n;
      }
      function s(t) {
        if ("object" !== e(t)) return {};
        var n = {};
        for (var a in t) n[a] = t[a];
        return n;
      }
      function l(e, t) {
        var n = r(e, t);
        return (
          e.context && t.context && (n.context = r(e.context, t.context)), n
        );
      }
      function d(e) {
        return (
          !!v &&
          v.name === e.name &&
          v.message === e.message &&
          v.stack === e.stack
        );
      }
      function u(e, t) {
        return (
          !!Array.isArray(t) &&
          t.some(function (t) {
            return t.test(e.message);
          })
        );
      }
      function m(t) {
        if ("object" !== e(t)) return undefined;
        var n = [];
        for (var a in t) n.push(a + "=" + t[a]);
        return n.join(";");
      }
      function f(e) {
        return e.stacktrace || e.stack || undefined;
      }
      function g(e) {
        var t,
          n = 10;
        if (e && (t = f(e))) return { stack: t, generator: undefined };
        try {
          throw new Error("");
        } catch (o) {
          if ((t = f(o))) return { stack: t, generator: "throw" };
        }
        t = ["<call-stack>"];
        for (var a = arguments.callee; a && t.length < n; ) {
          /function(?:\s+([\w$]+))+\s*\(/.test(a.toString())
            ? t.push(RegExp.$1 || "<anonymous>")
            : t.push("<anonymous>");
          try {
            a = a.caller;
          } catch (o) {
            break;
          }
        }
        return { stack: t.join("\n"), generator: "walk" };
      }
      function p(e, t, n) {
        var a, o;
        for (a = 0, o = e.length; a < o; a++)
          if (!1 === (0, e[a])(t, n)) return !0;
        return !1;
      }
      function h(e) {
        for (var t in e)
          if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0;
      }
      function y(e) {
        return (
          "function" != typeof Object.isExtensible || Object.isExtensible(e)
        );
      }
      var v,
        b = "2.3.0",
        w = {
          name: "honeybadger-js",
          url: "https://github.com/honeybadger-io/honeybadger-js",
          version: b,
          language: "javascript",
        },
        k = !1,
        _ = !1,
        E = 0;
      return function (T) {
        function L() {
          var e = window.console;
          if (e) {
            var t = Array.prototype.slice.call(arguments);
            t.unshift("[Honeybadger]"), e.log.apply(e, t);
          }
        }
        function I() {
          if (B("debug")) return L.apply(this, arguments);
        }
        function B(e, t) {
          var n = $[e];
          return (
            n === undefined && (n = $[e.toLowerCase()]),
            "false" === n && (n = !1),
            n !== undefined ? n : t
          );
        }
        function S() {
          return !F && B("onerror", !0);
        }
        function x() {
          return !F && B("onunhandledrejection", !0);
        }
        function C(e) {
          return (
            !0 === $.breadcrumbsEnabled ||
            (e ? !0 === $.breadcrumbsEnabled[e] : !1 !== $.breadcrumbsEnabled)
          );
        }
        function A() {
          return (
            "http" +
            (B("ssl", !0) ? "s" : "") +
            "://" +
            B("host", "api.honeybadger.io")
          );
        }
        function M(e, n) {
          try {
            var a = H(n),
              o = new XMLHttpRequest();
            o.open("POST", A() + "/v1/notices/js", B("async", !0)),
              o.setRequestHeader("X-API-Key", e),
              o.setRequestHeader("Content-Type", "application/json"),
              o.setRequestHeader("Accept", "text/json, application/json"),
              o.send(JSON.stringify(t(a, B("max_depth", 8)))),
              (o.onload = function () {
                var e = Array.prototype.slice.call($.afterNotifyHandlers);
                if (
                  (n.afterNotify && e.unshift(n.afterNotify), 201 !== o.status)
                )
                  return (
                    p(e, new Error("Bad HTTP response: ".concat(o.status)), n),
                    void I(
                      "Unable to send error report: "
                        .concat(o.status, ": ")
                        .concat(o.statusText),
                      o,
                      n
                    )
                  );
                p(e, undefined, r(n, { id: JSON.parse(o.response).id })),
                  I("Error report sent", a);
              });
          } catch (i) {
            p($.afterNotifyHandlers, i, n),
              L(
                "Unable to send error report: error while initializing request",
                i,
                n
              );
          }
        }
        function N(e) {
          if (((v = null), B("disabled", !1)))
            return I("Dropping notice: honeybadger.js is disabled", e), !1;
          var t = B("apiKey", B("api_key"));
          return t
            ? z()
              ? (I("Dropping notice: max errors exceeded", e), !1)
              : (P(), M(t, e), !0)
            : (L("Unable to send error report: no API key has been configured"),
              !1);
        }
        function H(t) {
          var n = {};
          return (
            t.userAgent && (n.HTTP_USER_AGENT = t.userAgent),
            t.referrer && (n.HTTP_REFERER = t.referrer),
            "string" == typeof t.cookies
              ? (n.HTTP_COOKIE = t.cookies)
              : "object" === e(t.cookies) && (n.HTTP_COOKIE = m(t.cookies)),
            {
              notifier: w,
              breadcrumbs: { enabled: C(), trail: t.breadcrumbs },
              error: {
                class: t.name,
                message: t.message,
                backtrace: t.stack,
                generator: t.generator,
                fingerprint: t.fingerprint,
              },
              request: {
                url: t.url,
                component: t.component,
                action: t.action,
                context: t.context,
                cgi_data: n,
                params: t.params,
              },
              server: {
                project_root: t.projectRoot,
                environment_name: t.environment,
                revision: t.revision,
              },
            }
          );
        }
        function R(t, n) {
          if (
            (t || (t = {}),
            "[object Error]" === Object.prototype.toString.call(t))
          ) {
            var a = t;
            t = r(t, { name: a.name, message: a.message, stack: f(a) });
          }
          if ("object" !== e(t)) {
            var o = String(t);
            t = { message: o };
          }
          if (d(t)) return !1;
          if ((v && k && N(v), h(t))) return !1;
          var i;
          n && ((t.stack = n.stack), (i = n.generator)),
            (t = r(t, {
              name: t.name || "Error",
              context: r($.context, t.context),
              url: t.url || document.URL,
              projectRoot:
                t.projectRoot ||
                t.project_root ||
                B(
                  "projectRoot",
                  B(
                    "project_root",
                    window.location.protocol + "//" + window.location.host
                  )
                ),
              environment: t.environment || B("environment"),
              component: t.component || B("component"),
              action: t.action || B("action"),
              revision: t.revision || B("revision"),
              userAgent: t.userAgent || navigator.userAgent,
              referrer: t.referrer || document.referrer,
            })),
            $.addBreadcrumb("Honeybadger Notice", {
              category: "notice",
              metadata: { message: t.message, name: t.name, stack: t.stack },
            }),
            (t.breadcrumbs = $.breadcrumbs.slice());
          var s = t.stack;
          return (
            !p($.beforeNotifyHandlers, t) &&
            (t.stack != s && (i = undefined),
            !u(t, B("ignorePatterns")) &&
              ((t.generator = i),
              (v = t),
              k
                ? (I("Deferring notice", t),
                  window.setTimeout(function () {
                    d(t) && N(t);
                  }))
                : (I("Queuing notice", t), U.push(t)),
              t))
          );
        }
        function O(e, t) {
          t || (t = {});
          try {
            return "function" != typeof e
              ? e
              : y(e)
              ? (e.___hb ||
                  (e.___hb = function () {
                    var n = S();
                    if (!((X && (n || t.force)) || (t.force && !n)))
                      return e.apply(this, arguments);
                    try {
                      return e.apply(this, arguments);
                    } catch (o) {
                      var a = { stack: f(o) };
                      throw (
                        ($.addBreadcrumb(
                          t.component
                            ? "".concat(t.component, ": ").concat(o.name)
                            : o.name,
                          {
                            category: "error",
                            metadata: {
                              message: o.message,
                              name: o.name,
                              stack: a.stack,
                            },
                          }
                        ),
                        R(o, a),
                        o)
                      );
                    }
                  }),
                (e.___hb.___hb = e.___hb),
                e.___hb)
              : e;
          } catch (n) {
            return e;
          }
        }
        function D(e, t, n) {
          if (!F && e && t && n && t in e) {
            for (var a = e[t]; a && a.__hb_original; ) a = a.__hb_original;
            (e[t] = n(a)), (e[t].__hb_original = a);
          }
        }
        function P() {
          return $.errorsSent++;
        }
        function z() {
          var e = B("maxErrors");
          return e && $.errorsSent >= e;
        }
        var j = 1 === (E += 1),
          F = !j,
          q = [],
          U = [],
          $ = {
            context: {},
            beforeNotifyHandlers: [],
            afterNotifyHandlers: [],
            breadcrumbs: [],
            errorsSent: 0,
            breadcrumbsEnabled: {
              dom: !0,
              network: !0,
              navigation: !0,
              console: !0,
            },
          };
        if ("object" === e(T)) for (var V in T) $[V] = T[V];
        var X = !0;
        if ((window.atob || (X = !1), window.ErrorEvent))
          try {
            0 === new window.ErrorEvent("").colno && (X = !1);
          } catch (Y) {}
        ($.notify = function (t, n, a) {
          if (
            (t || (t = {}),
            "[object Error]" === Object.prototype.toString.call(t))
          ) {
            var o = t;
            t = r(t, { name: o.name, message: o.message, stack: f(o) });
          }
          "object" !== e(t) && (t = { message: String(t) });
          n && "object" !== e(n) && (n = { name: String(n) });
          return (
            n && (t = l(t, n)), "object" === e(a) && (t = l(t, a)), R(t, g(t))
          );
        }),
          ($.wrap = function (e) {
            return O(e, { force: !0 });
          }),
          ($.setContext = function (t) {
            return "object" === e(t) && ($.context = r($.context, t)), $;
          }),
          ($.resetContext = function (t) {
            return (
              "object" === e(t) ? ($.context = r({}, t)) : ($.context = {}), $
            );
          }),
          ($.configure = function (e) {
            for (var t in e) $[t] = e[t];
            return (
              j &&
                !_ &&
                ((_ = !0),
                W.forEach(function (e) {
                  return e();
                })),
              $
            );
          }),
          ($.beforeNotify = function (e) {
            return $.beforeNotifyHandlers.push(e), $;
          }),
          ($.afterNotify = function (e) {
            return $.afterNotifyHandlers.push(e), $;
          });
        var J =
          [].indexOf ||
          function (e) {
            for (var t = 0, n = this.length; t < n; t++)
              if (t in this && this[t] === e) return t;
            return -1;
          };
        ($.reset = function () {
          for (var e in (($.context = {}),
          ($.beforeNotifyHandlers = []),
          ($.breadcrumbs = []),
          $))
            -1 == J.call(q, e) && ($[e] = undefined);
          return $.resetMaxErrors(), $;
        }),
          ($.resetMaxErrors = function () {
            return ($.errorsSent = 0);
          }),
          ($.getVersion = function () {
            return b;
          }),
          ($.addBreadcrumb = function (e, t) {
            if (C()) {
              var n = s((t = t || {}).metadata),
                a = t.category || "custom",
                o = new Date().toISOString();
              $.breadcrumbs.push({
                category: a,
                message: e,
                metadata: n,
                timestamp: o,
              });
              var i = B("maxBreadcrumbs", 40);
              return (
                $.breadcrumbs.length > i &&
                  ($.breadcrumbs = $.breadcrumbs.slice(
                    $.breadcrumbs.length - i
                  )),
                $
              );
            }
          });
        var W = [];
        for (var V in (W.push(function () {
          C("dom") &&
            window.addEventListener(
              "click",
              function (e) {
                var t, i, r;
                try {
                  (t = n(e.target)), (i = a(e.target)), (r = o(e.target));
                } catch (s) {
                  (t = "UI Click"), (i = "[unknown]"), (r = "[unknown]");
                }
                0 !== t.length &&
                  $.addBreadcrumb(t, {
                    category: "ui.click",
                    metadata: { selector: i, text: r, event: e },
                  });
              },
              !0
            );
        }),
        W.push(function () {
          C("network") &&
            (D(XMLHttpRequest.prototype, "open", function (e) {
              return function () {
                var t = this,
                  n = arguments[1],
                  a =
                    "string" == typeof arguments[0]
                      ? arguments[0].toUpperCase()
                      : arguments[0],
                  o = "".concat(a, " ").concat(c(n));
                (this.__hb_xhr = {
                  type: "xhr",
                  method: a,
                  url: n,
                  message: o,
                }),
                  "function" == typeof e && e.apply(t, arguments);
              };
            }),
            D(XMLHttpRequest.prototype, "send", function (e) {
              return function () {
                function t() {
                  var e;
                  4 === n.readyState &&
                    (n.__hb_xhr &&
                      ((n.__hb_xhr.status_code = n.status),
                      (e = n.__hb_xhr.message),
                      delete n.__hb_xhr.message),
                    $.addBreadcrumb(e || "XMLHttpRequest", {
                      category: "request",
                      metadata: n.__hb_xhr,
                    }));
                }
                var n = this;
                "onreadystatechange" in n &&
                "function" == typeof n.onreadystatechange
                  ? D(n, "onreadystatechange", function (e) {
                      return function () {
                        t(), "function" == typeof e && e.apply(this, arguments);
                      };
                    })
                  : (n.onreadystatechange = t),
                  "function" == typeof e && e.apply(n, arguments);
              };
            }));
        }),
        W.push(function () {
          C("network") &&
            i() &&
            D(window, "fetch", function (e) {
              return function () {
                var t,
                  n = arguments[0],
                  a = "GET";
                "string" == typeof n
                  ? (t = n)
                  : "Request" in window && n instanceof Request
                  ? ((t = n.url), n.method && (a = n.method))
                  : (t = String(n)),
                  arguments[1] &&
                    arguments[1].method &&
                    (a = arguments[1].method),
                  "string" == typeof a && (a = a.toUpperCase());
                var o = "".concat(a, " ").concat(c(t)),
                  i = { type: "fetch", method: a, url: t };
                return e
                  .apply(this, arguments)
                  .then(function (e) {
                    return (
                      (i.status_code = e.status),
                      $.addBreadcrumb(o, { category: "request", metadata: i }),
                      e
                    );
                  })
                  ["catch"](function (e) {
                    throw (
                      ($.addBreadcrumb("fetch error", {
                        category: "error",
                        metadata: i,
                      }),
                      e)
                    );
                  });
              };
            });
        }),
        W.push(function () {
          function e(e, t) {
            (n = t),
              $.addBreadcrumb("Page changed", {
                category: "navigation",
                metadata: { from: e, to: t },
              });
          }
          function t(t) {
            return function () {
              var a = arguments.length > 2 ? arguments[2] : undefined;
              return a && e(n, String(a)), t.apply(this, arguments);
            };
          }
          if (C("navigation")) {
            var n = window.location.href;
            D(window, "onpopstate", function (t) {
              return function () {
                if ((e(n, window.location.href), t))
                  return t.apply(this, arguments);
              };
            }),
              D(window.history, "pushState", t),
              D(window.history, "replaceState", t);
          }
        }),
        W.push(function () {
          function e(e) {
            return Array.isArray(e)
              ? e
                  .map(function (e) {
                    try {
                      return String(e);
                    } catch (t) {
                      return "[unknown]";
                    }
                  })
                  .join(" ")
              : "";
          }
          C("console") &&
            ["debug", "info", "warn", "error", "log"].forEach(function (n) {
              D(window.console, n, function (a) {
                return function () {
                  var o = Array.prototype.slice.call(arguments),
                    i = e(o),
                    r = {
                      category: "log",
                      metadata: { level: n, arguments: t(o, 3) },
                    };
                  $.addBreadcrumb(i, r),
                    "function" == typeof a &&
                      Function.prototype.apply.call(
                        a,
                        window.console,
                        arguments
                      );
                };
              });
            });
        }),
        (function () {
          function e(e) {
            return function (t) {
              return function (n, a) {
                if ("function" == typeof n) {
                  var o = Array.prototype.slice.call(arguments, 2);
                  return (
                    (n = O(n, e)),
                    t(function () {
                      n.apply(null, o);
                    }, a)
                  );
                }
                return t(n, a);
              };
            };
          }
          D(window, "setTimeout", e({ component: "setTimeout" })),
            D(window, "setInterval", e({ component: "setInterval" }));
        })(),
        "EventTarget Window Node ApplicationCache AudioTrackList ChannelMergerNode CryptoOperation EventSource FileReader HTMLUnknownElement IDBDatabase IDBRequest IDBTransaction KeyOperation MediaController MessagePort ModalWindow Notification SVGElementInstance Screen TextTrack TextTrackCue TextTrackList WebSocket WebSocketWorker Worker XMLHttpRequest XMLHttpRequestEventTarget XMLHttpRequestUpload".replace(
          /\w+/g,
          function (e) {
            var t = window[e] && window[e].prototype;
            t &&
              t.hasOwnProperty &&
              t.hasOwnProperty("addEventListener") &&
              (D(t, "addEventListener", function (t) {
                var n = {
                  component: "".concat(e, ".prototype.addEventListener"),
                };
                return function (e, a, o, i) {
                  try {
                    a &&
                      null != a.handleEvent &&
                      (a.handleEvent = O(a.handleEvent, n));
                  } catch (r) {
                    L(r);
                  }
                  return t.call(this, e, O(a, n), o, i);
                };
              }),
              D(t, "removeEventListener", function (e) {
                return function (t, n, a, o) {
                  return e.call(this, t, n, a, o), e.call(this, t, O(n), a, o);
                };
              }));
          }
        ),
        D(window, "onerror", function (e) {
          function t(e, t, n, a, o) {
            if ((I("window.onerror callback invoked", arguments), !v && S()))
              if (0 === n && /Script error\.?/.test(e))
                L(
                  "Ignoring cross-domain script error: enable CORS to track these types of errors",
                  arguments
                );
              else {
                var i,
                  r = [
                    e,
                    "\n    at ? (",
                    t || "unknown",
                    ":",
                    n || 0,
                    ":",
                    a || 0,
                    ")",
                  ].join("");
                o
                  ? (i = { stack: f(o) }).stack || (i = { stack: r })
                  : (o = { name: "window.onerror", message: e, stack: r }),
                  $.addBreadcrumb(
                    "window.onerror" !== o.name && o.name
                      ? "window.onerror: ".concat(o.name)
                      : "window.onerror",
                    {
                      category: "error",
                      metadata: {
                        message: o.message,
                        name: o.name,
                        stack: i ? i.stack : o.stack,
                      },
                    }
                  ),
                  R(o, i);
              }
          }
          return function (n, a, o, i, r) {
            return (
              t(n, a, o, i, r),
              !("function" != typeof e || !B("_onerror_call_orig", !0)) &&
                e.apply(this, arguments)
            );
          };
        }),
        D(window, "onunhandledrejection", function (e) {
          function t(e) {
            if (
              (I("window.onunhandledrejection callback invoked", arguments),
              !v && x())
            ) {
              var t = e.reason;
              if (t instanceof Error) {
                var n = t.fileName || "unknown",
                  a = t.lineNumber || 0,
                  o = ""
                    .concat(t.message, "\n    at ? (")
                    .concat(n, ":")
                    .concat(a, ")"),
                  i = f(t) || o,
                  r = {
                    name: t.name,
                    message: "UnhandledPromiseRejectionWarning: ".concat(t),
                    stack: i,
                  };
                return (
                  $.addBreadcrumb(
                    "window.onunhandledrejection: ".concat(r.name),
                    { category: "error", metadata: r }
                  ),
                  void R(r)
                );
              }
              var s = "string" == typeof t ? t : JSON.stringify(t);
              R({
                name: "window.onunhandledrejection",
                message: "UnhandledPromiseRejectionWarning: ".concat(s),
              });
            }
          }
          return function (n) {
            t(n), "function" == typeof e && e.apply(this, arguments);
          };
        }),
        $))
          q.push(V);
        if (
          (I("Initializing honeybadger.js " + b),
          /complete|interactive|loaded/.test(document.readyState))
        )
          (k = !0), I("honeybadger.js " + b + " ready");
        else {
          I("Installing ready handler");
          var K = function () {
            var e;
            for (k = !0, I("honeybadger.js " + b + " ready"); (e = U.pop()); )
              N(e);
          };
          document.addEventListener
            ? document.addEventListener("DOMContentLoaded", K, !0)
            : window.attachEvent("onload", K);
        }
        return $;
      };
    }
    var m = u(),
      f = m();
    return (f.factory = m), f;
  }),
  (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e = e || self).ahoy = t());
  })(this, function () {
    "use strict";
    function e() {
      return P.urlPrefix + P.visitsUrl;
    }
    function t() {
      return P.urlPrefix + P.eventsUrl;
    }
    function n(e) {
      return 0 === Object.keys(e).length;
    }
    function a() {
      return (
        (P.useBeacon || P.trackNow) &&
        n(P.headers) &&
        X &&
        "undefined" != typeof window.navigator.sendBeacon &&
        !P.withCredentials
      );
    }
    function o(e, t, n) {
      D.set(e, t, n, P.cookieDomain || P.domain);
    }
    function i(e) {
      return D.get(e);
    }
    function r(e) {
      D.set(e, "", -1);
    }
    function s(e) {
      i("ahoy_debug") && window.console.log(e);
    }
    function c() {
      for (var e; (e = V.shift()); ) e();
      $ = !0;
    }
    function l(e, t) {
      var n =
        e.matches ||
        e.matchesSelector ||
        e.mozMatchesSelector ||
        e.msMatchesSelector ||
        e.oMatchesSelector ||
        e.webkitMatchesSelector;
      return n ? n.apply(e, [t]) : (s("Unable to match"), !1);
    }
    function d(e, t, n) {
      document.addEventListener(e, function (e) {
        l(e.target, t) && n(e);
      });
    }
    function u(e) {
      "interactive" === document.readyState ||
      "complete" === document.readyState
        ? setTimeout(e, 0)
        : document.addEventListener("DOMContentLoaded", e);
    }
    function m() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (e) {
          var t = (16 * Math.random()) | 0;
          return ("x" == e ? t : (3 & t) | 8).toString(16);
        }
      );
    }
    function f() {
      P.cookies && X && o("ahoy_events", JSON.stringify(J), 1);
    }
    function g() {
      var e = document.querySelector("meta[name=csrf-token]");
      return e && e.content;
    }
    function p() {
      var e = document.querySelector("meta[name=csrf-param]");
      return e && e.content;
    }
    function h(e) {
      var t = g();
      t && e.setRequestHeader("X-CSRF-Token", t);
    }
    function y(e, t, n) {
      if (X)
        if (U && U.ajax)
          U.ajax({
            type: "POST",
            url: e,
            data: JSON.stringify(t),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: h,
            success: n,
            headers: P.headers,
            xhrFields: { withCredentials: P.withCredentials },
          });
        else {
          var a = new XMLHttpRequest();
          for (var o in (a.open("POST", e, !0),
          (a.withCredentials = P.withCredentials),
          a.setRequestHeader("Content-Type", "application/json"),
          P.headers))
            P.headers.hasOwnProperty(o) && a.setRequestHeader(o, P.headers[o]);
          (a.onload = function () {
            200 === a.status && n();
          }),
            h(a),
            a.send(JSON.stringify(t));
        }
    }
    function v(e) {
      var t = { events: [e] };
      return (
        P.cookies &&
          ((t.visit_token = e.visit_token),
          (t.visitor_token = e.visitor_token)),
        delete e.visit_token,
        delete e.visitor_token,
        t
      );
    }
    function b(e) {
      z.ready(function () {
        y(t(), v(e), function () {
          for (var t = 0; t < J.length; t++)
            if (J[t].id == e.id) {
              J.splice(t, 1);
              break;
            }
          f();
        });
      });
    }
    function w(e) {
      z.ready(function () {
        var n = v(e),
          a = p(),
          o = g();
        a && o && (n[a] = o),
          (n.events_json = JSON.stringify(n.events)),
          delete n.events,
          window.navigator.sendBeacon(t(), O(n));
      });
    }
    function k() {
      return P.page || window.location.pathname;
    }
    function _(e) {
      return e && e.length > 0 ? e : null;
    }
    function E(e) {
      for (var t in e) e.hasOwnProperty(t) && null === e[t] && delete e[t];
      return e;
    }
    function T(e) {
      var t = e.target;
      return E({
        tag: t.tagName.toLowerCase(),
        id: _(t.id),
        class: _(t.className),
        page: k(),
        section: L(t),
      });
    }
    function L(e) {
      for (; e && e !== document; e = e.parentNode)
        if (e.hasAttribute("data-section"))
          return e.getAttribute("data-section");
      return null;
    }
    function I() {
      if (
        (($ = !1),
        (j = z.getVisitId()),
        (F = z.getVisitorId()),
        (q = i("ahoy_track")),
        !1 === P.cookies || !1 === P.trackVisits)
      )
        s("Visit tracking disabled"), c();
      else if (j && F && !q) s("Active visit"), c();
      else if (
        (j || o("ahoy_visit", (j = m()), P.visitDuration), i("ahoy_visit"))
      ) {
        s("Visit started"),
          F || o("ahoy_visitor", (F = m()), P.visitorDuration);
        var t = {
          visit_token: j,
          visitor_token: F,
          platform: P.platform,
          landing_page: window.location.href,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
          js: !0,
        };
        for (var n in (document.referrer.length > 0 &&
          (t.referrer = document.referrer),
        P.visitParams))
          P.visitParams.hasOwnProperty(n) && (t[n] = P.visitParams[n]);
        s(t),
          y(e(), t, function () {
            r("ahoy_track"), c();
          });
      } else s("Cookies disabled"), c();
    }
    var B = function (e) {
        return e === undefined;
      },
      S = function (e) {
        return null === e;
      },
      x = function (e) {
        return "boolean" == typeof e;
      },
      C = function (e) {
        return e === Object(e);
      },
      A = function (e) {
        return Array.isArray(e);
      },
      M = function (e) {
        return e instanceof Date;
      },
      N = function (e) {
        return (
          e &&
          "number" == typeof e.size &&
          "string" == typeof e.type &&
          "function" == typeof e.slice
        );
      },
      H = function (e) {
        return (
          N(e) &&
          "string" == typeof e.name &&
          ("object" == typeof e.lastModifiedDate ||
            "number" == typeof e.lastModified)
        );
      },
      R = function (e, t, n, a) {
        return (
          ((t = t || {}).indices = !B(t.indices) && t.indices),
          (t.nullsAsUndefineds =
            !B(t.nullsAsUndefineds) && t.nullsAsUndefineds),
          (t.booleansAsIntegers =
            !B(t.booleansAsIntegers) && t.booleansAsIntegers),
          (n = n || new FormData()),
          B(e)
            ? n
            : (S(e)
                ? t.nullsAsUndefineds || n.append(a, "")
                : x(e)
                ? t.booleansAsIntegers
                  ? n.append(a, e ? 1 : 0)
                  : n.append(a, e)
                : A(e)
                ? e.length &&
                  e.forEach(function (e, o) {
                    var i = a + "[" + (t.indices ? o : "") + "]";
                    R(e, t, n, i);
                  })
                : M(e)
                ? n.append(a, e.toISOString())
                : !C(e) || H(e) || N(e)
                ? n.append(a, e)
                : Object.keys(e).forEach(function (o) {
                    var i = e[o];
                    if (A(i))
                      for (
                        ;
                        o.length > 2 && o.lastIndexOf("[]") === o.length - 2;

                      )
                        o = o.substring(0, o.length - 2);
                    R(i, t, n, a ? a + "[" + o + "]" : o);
                  }),
              n)
        );
      },
      O = { serialize: R }.serialize,
      D = {
        set: function (e, t, n, a) {
          var o = "",
            i = "";
          if (n) {
            var r = new Date();
            r.setTime(r.getTime() + 60 * n * 1e3),
              (o = "; expires=" + r.toGMTString());
          }
          a && (i = "; domain=" + a),
            (document.cookie = e + "=" + escape(t) + o + i + "; path=/");
        },
        get: function (e) {
          var t,
            n,
            a = e + "=",
            o = document.cookie.split(";");
          for (t = 0; t < o.length; t++) {
            for (n = o[t]; " " === n.charAt(0); ) n = n.substring(1, n.length);
            if (0 === n.indexOf(a))
              return unescape(n.substring(a.length, n.length));
          }
          return null;
        },
      },
      P = {
        urlPrefix: "",
        visitsUrl: "/ahoy/visits",
        eventsUrl: "/ahoy/events",
        page: null,
        platform: "Web",
        useBeacon: !0,
        startOnReady: !0,
        trackVisits: !0,
        cookies: !0,
        cookieDomain: null,
        headers: {},
        visitParams: {},
        withCredentials: !1,
        visitDuration: 240,
        visitorDuration: 1051200,
      },
      z = window.ahoy || window.Ahoy || {};
    (z.configure = function (e) {
      for (var t in e) e.hasOwnProperty(t) && (P[t] = e[t]);
    }),
      z.configure(z);
    var j,
      F,
      q,
      U = window.jQuery || window.Zepto || window.$,
      $ = !1,
      V = [],
      X = "undefined" != typeof JSON && "undefined" != typeof JSON.stringify,
      J = [];
    (z.ready = function (e) {
      $ ? e() : V.push(e);
    }),
      (z.getVisitId = z.getVisitToken = function () {
        return i("ahoy_visit");
      }),
      (z.getVisitorId = z.getVisitorToken = function () {
        return i("ahoy_visitor");
      }),
      (z.reset = function () {
        return (
          r("ahoy_visit"),
          r("ahoy_visitor"),
          r("ahoy_events"),
          r("ahoy_track"),
          !0
        );
      }),
      (z.debug = function (e) {
        return !1 === e ? r("ahoy_debug") : o("ahoy_debug", "t", 525600), !0;
      }),
      (z.track = function (e, t) {
        var n = {
          name: e,
          properties: t || {},
          time: new Date().getTime() / 1e3,
          id: m(),
          js: !0,
        };
        return (
          z.ready(function () {
            P.cookies && !z.getVisitId() && I(),
              z.ready(function () {
                s(n),
                  (n.visit_token = z.getVisitId()),
                  (n.visitor_token = z.getVisitorId()),
                  a()
                    ? w(n)
                    : (J.push(n),
                      f(),
                      setTimeout(function () {
                        b(n);
                      }, 1e3));
              });
          }),
          !0
        );
      }),
      (z.trackView = function (e) {
        var t = { url: window.location.href, title: document.title, page: k() };
        if (e) for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        z.track("$view", t);
      }),
      (z.trackClicks = function () {
        d("click", "a, button, input[type=submit]", function (e) {
          var t = e.target,
            n = T(e);
          (n.text =
            "input" == n.tag
              ? t.value
              : (t.textContent || t.innerText || t.innerHTML)
                  .replace(/[\s\r\n]+/g, " ")
                  .trim()),
            (n.href = t.href),
            z.track("$click", n);
        });
      }),
      (z.trackSubmits = function () {
        d("submit", "form", function (e) {
          var t = T(e);
          z.track("$submit", t);
        });
      }),
      (z.trackChanges = function () {
        d("change", "input, textarea, select", function (e) {
          var t = T(e);
          z.track("$change", t);
        });
      }),
      (z.trackAll = function () {
        z.trackView(), z.trackClicks(), z.trackSubmits(), z.trackChanges();
      });
    try {
      J = JSON.parse(i("ahoy_events") || "[]");
    } catch (K) {}
    for (var W = 0; W < J.length; W++) b(J[W]);
    return (
      (z.start = function () {
        I(), (z.start = function () {});
      }),
      u(function () {
        P.startOnReady && z.start();
      }),
      z
    );
  }),
  "serviceWorker" in navigator &&
    navigator.serviceWorker
      .register("/serviceworker.js", { scope: "/" })
      .then(function () {})
      ["catch"]((e) => {
        console.log("ServiceWorker registration failed: ", e);
      }),
  window.addEventListener("beforeinstallprompt", (e) => {
    e.userChoice.then((e) => {
      ga("send", "event", "PWA-install", e.outcome);
    });
  });
var instantClick,
  InstantClick = (instantClick = (function (e, t, n) {
    function a(e) {
      var t = e.indexOf("#");
      return t < 0 ? e : e.substr(0, t);
    }
    function o(e) {
      for (; e && "A" != e.nodeName; ) e = e.parentNode;
      return e;
    }
    function i(e) {
      do {
        if (!e.hasAttribute) break;
        if (e.hasAttribute("data-instant")) return !1;
        if (e.hasAttribute("data-no-instant")) return !0;
      } while ((e = e.parentNode));
      return !1;
    }
    function r(e) {
      var n = t.protocol + "//" + t.host;
      return !(
        e.target ||
        e.hasAttribute("download") ||
        0 != e.href.indexOf(n + "/") ||
        (e.href.indexOf("#") > -1 && a(e.href) == B) ||
        i(e)
      );
    }
    function s(e, t, n, a) {
      for (var o = !1, i = 0; i < U[e].length; i++)
        if ("receive" == e) {
          var r = U[e][i](t, n, a);
          r &&
            ("body" in r && (n = r.body),
            "title" in r && (a = r.title),
            (o = r));
        } else U[e][i](t, n, a);
      return o;
    }
    function c(t, n, o, i, r) {
      var c = e.getElementById("page-content");
      if (
        (e.getElementById("navigation-butt") &&
          e.getElementById("navigation-butt").classList.remove("showing"),
        e.getElementsByTagName("BODY")[0].replaceChild(n, c),
        e.getElementById("navigation-progress").classList.remove("showing"),
        o)
      ) {
        history.pushState(
          null,
          null,
          o.replace("?samepage=true", "").replace("&samepage=true", "")
        );
        var l = o.indexOf("#"),
          d =
            l > -1 &&
            (e.getElementById(o.substr(l + 1)) ||
              e.querySelector(`[name=${o.substr(l + 1)}].anchor`)),
          u = 0,
          m = o.indexOf("samepage=true") > -1;
        if (d)
          for (; d.offsetParent; ) (u += d.offsetTop), (d = d.offsetParent);
        m || scrollTo(0, u), (B = a(o));
      } else scrollTo(0, i);
      H && e.title == t
        ? (e.title = t + String.fromCharCode(160))
        : (e.title = t),
        b(),
        r ? s("restore") : s("change", !1);
    }
    function l() {
      (j = !1), (F = !1);
    }
    function d(e) {
      return e.replace(/<noscript[\s\S]+?<\/noscript>/gi, "");
    }
    function u(e) {
      if (!(C > +new Date() - 500)) {
        var t = o(e.target);
        t && r(t) && w(t.href);
      }
    }
    function m(e) {
      if (!(C > +new Date() - 500)) {
        var t = o(e.target);
        t &&
          r(t) &&
          (t.addEventListener("mouseout", p),
          N ? ((S = t.href), (x = setTimeout(w, N))) : w(t.href),
          getImageForLink(t));
      }
    }
    function f(e) {
      C = +new Date();
      var t = o(e.target);
      t &&
        r(t) &&
        (M
          ? t.removeEventListener("mousedown", u)
          : t.removeEventListener("mouseover", m),
        w(t.href),
        getImageForLink(t));
    }
    function g(e) {
      try {
        var t = o(e.target);
        if (!t || !r(t)) return;
        if (e.which > 1 || e.metaKey || e.ctrlKey) return;
        E(t.href), e.preventDefault();
      } catch (n) {
        console.log(n);
      }
    }
    function p() {
      if (x) return clearTimeout(x), void (x = !1);
      j && !F && (A.abort(), l());
    }
    function h() {
      y(A, O);
    }
    function y(t, n) {
      if (!(t.readyState < 4) && 0 != t.status) {
        if (
          ((z.ready = +new Date() - z.start),
          e.getElementById("page-content") &&
            200 === t.status &&
            t.getResponseHeader("Content-Type").match(/\/(x|ht|xht)ml/))
        ) {
          var o = e.implementation.createHTMLDocument("");
          o.documentElement.innerHTML = d(t.responseText);
          var i = o.title,
            r = o.getElementById("page-content"),
            c = s("receive", n, r, i);
          c && ("body" in c && (r = c.body), "title" in c && (i = c.title)),
            (P[n] = { body: r, title: i });
          a(n);
          for (var l, u, m = o.head.children, f = 0, g = 0; g < m.length; g++)
            if ((l = m[g]).hasAttribute("data-instant-track")) {
              u =
                l.getAttribute("href") || l.getAttribute("src") || l.innerHTML;
              for (var p = 0; p < q.length; p++) q[p] == u && f++;
            }
          f != q.length && (D = !0);
        } else D = !0;
        F && O === n && ((F = !1), E(O));
      }
    }
    function v() {
      var n = a(t.href);
      n != B &&
        (n in R
          ? ((R[B] = {
              body: e.getElementById("page-content"),
              title: e.title,
              scrollY: pageYOffset,
            }),
            (B = n),
            c(R[n].title, R[n].body, !1, R[n].scrollY, !0))
          : (t.href = t.href));
    }
    function b(t) {
      if (
        (e.body &&
          (e.body.addEventListener("touchstart", f, !0),
          M
            ? e.body.addEventListener("mousedown", u, !0)
            : e.body.addEventListener("mouseover", m, !0),
          e.body.addEventListener("click", g, !0)),
        !t)
      ) {
        var n,
          a,
          o,
          i,
          r,
          s = e.body.getElementsByTagName("script"),
          c = [];
        for (r = 0; r < s.length; r++) c.push(s[r]);
        for (r = 0; r < c.length; r++)
          if ((n = c[r]) && !n.hasAttribute("data-no-instant")) {
            a = e.createElement("script");
            for (var l = 0; l < n.attributes.length; l++)
              a.setAttribute(n.attributes[l].name, n.attributes[l].value);
            (a.textContent = n.textContent),
              (o = n.parentNode),
              (i = n.nextSibling),
              o.removeChild(n),
              o.insertBefore(a, i);
          }
      }
    }
    function w(e, t) {
      if (
        !(!M && "display" in z && +new Date() - (z.start + z.display) < 100) &&
        (x && (clearTimeout(x), (x = !1)), e || (e = S), !j || (e != O && !F))
      ) {
        if (
          ((j = !0),
          (F = !1),
          (D = !1),
          (z = { start: +new Date() }),
          -1 == e.indexOf("?"))
        )
          var n = e + "?i=i";
        else n = e + "&i=i";
        k(),
          s("fetch"),
          P[e] ||
            ("force" === t
              ? _(e, function () {
                  y(this, e);
                })
              : ((O = e), A.open("GET", n), A.send()));
      }
    }
    function k(e) {
      (Object.keys(P).length > 13 || "force" == e) && (P = {});
    }
    function _(e, t) {
      var n = new XMLHttpRequest();
      if (-1 == e.indexOf("?")) var a = e + "?i=i";
      else a = e + "&i=i";
      n.open("GET", a, !0),
        (n.onreadystatechange = function () {
          4 == n.readyState && "function" == typeof t && t.apply(n);
        }),
        n.send();
    }
    function E(n) {
      if (((O = n), P[n]))
        var a = P[n].body,
          o = P[n].title;
      else e.getElementById("navigation-progress").classList.add("showing");
      if (("display" in z || (z.display = +new Date() - z.start), x || !j))
        return x && O && O != n
          ? void (t.href = n)
          : (w(n), s("wait"), void (F = !0));
      if (F) t.href = n;
      else if (D) t.href = O;
      else {
        if (!a) return s("wait"), void (F = !0);
        (R[B] = {
          body: e.getElementById("page-content"),
          title: e.title,
          scrollY: pageYOffset,
        }),
          l(),
          c(o, a, O);
      }
    }
    function T(n) {
      if (!B)
        if ($) {
          "mousedown" == n ? (M = !0) : "number" == typeof n && (N = n),
            (B = a(t.href)),
            (R[B] = {
              body: e.getElementById("page-content"),
              title: e.title,
              scrollY: pageYOffset,
            });
          for (var o, i, r = e.head.children, c = 0; c < r.length; c++)
            (o = r[c]).hasAttribute("data-instant-track") &&
              ((i =
                o.getAttribute("href") || o.getAttribute("src") || o.innerHTML),
              q.push(i));
          (A = new XMLHttpRequest()).addEventListener("readystatechange", h),
            b(!0),
            s("change", !0),
            addEventListener("popstate", v),
            I();
        } else s("change", !0);
    }
    function L(e, t) {
      U[e].push(t);
    }
    function I() {
      if ("ontouchstart" in e.documentElement) {
        var t = e.createElement("script");
        (t.src =
          "https://practicaldev-herokuapp-com.freetls.fastly.net/assets/lib/pulltorefresh-024072fa8283f5075dcc64576ce8b4a84be56db044b6603b2dd1bd054b457897.js"),
          e.head.appendChild(t);
        var n = setInterval(function () {
          if ("undefined" != typeof PullToRefresh) {
            PullToRefresh.init({
              mainElement: "body",
              passive: !0,
              onRefresh: function () {
                window.location.reload();
              },
            });
            clearInterval(n);
          }
        }, 1);
      }
    }
    var B,
      S,
      x,
      C,
      A,
      M,
      N,
      H = n.indexOf(" CriOS/") > -1,
      R = {},
      O = !1,
      D = !1,
      P = {},
      z = {},
      j = !1,
      F = !1,
      q = [],
      U = { fetch: [], receive: [], wait: [], change: [], restore: [] },
      $ =
        "pushState" in history &&
        (!n.match("Android") || n.match("Chrome/") || n.match("Firefox/")) &&
        "file:" != t.protocol;
    return {
      supported: $,
      init: T,
      isPreloadable: r,
      preload: w,
      removeExpiredKeys: k,
      display: E,
      on: L,
    };
  })(document, location, navigator.userAgent));
Honeybadger.configure({
  apiKey: document.body.dataset.honeybadgerKey,
  environment: "production",
  revision: document.body.dataset.releaseFootprint,
  ignorePatterns: [/ResizeObserver/i, /MetaMask/i],
}),
  ahoy.configure({ cookies: !1, trackVisits: !1 }),
  initializeBaseApp();
//# sourceMappingURL=/assets/base-ac1a010bb448dd093922090cb5caf52ebf87c00d7161043a3c0136480748247e.js.map
