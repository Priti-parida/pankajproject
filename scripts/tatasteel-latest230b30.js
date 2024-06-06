/*! jQuery v3.7.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */

/*bootstrap*/
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
!(function (t) {
    "use strict";
    var e = jQuery.fn.jquery.split(" ")[0].split(".");
    if ((e[0] < 2 && e[1] < 9) || (1 == e[0] && 9 == e[1] && e[2] < 1) || 3 < e[0]) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
})(),
    (function (o) {
        "use strict";
        (o.fn.emulateTransitionEnd = function (t) {
            var e = !1,
                i = this;
            o(this).one("bsTransitionEnd", function () {
                e = !0;
            });
            return (
                setTimeout(function () {
                    e || o(i).trigger(o.support.transition.end);
                }, t),
                this
            );
        }),
            o(function () {
                (o.support.transition = (function () {
                    var t = document.createElement("bootstrap"),
                        e = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
                    for (var i in e) if (void 0 !== t.style[i]) return { end: e[i] };
                    return !1;
                })()),
                    o.support.transition &&
                        (o.event.special.bsTransitionEnd = {
                            bindType: o.support.transition.end,
                            delegateType: o.support.transition.end,
                            handle: function (t) {
                                if (o(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
                            },
                        });
            });
    })(jQuery),
    (function (s) {
        "use strict";
        var e = '[data-dismiss="alert"]',
            a = function (t) {
                s(t).on("click", e, this.close);
            };
        (a.VERSION = "5.2.0"),
            (a.TRANSITION_DURATION = 150),
            (a.prototype.close = function (t) {
                var e = s(this),
                    i = e.attr("data-target");
                i || (i = (i = e.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, ""));
                var o = s("#" === i ? [] : i);
                function n() {
                    o.detach().trigger("closed.bs.alert").remove();
                }
                t && t.preventDefault(),
                    o.length || (o = e.closest(".alert")),
                    o.trigger((t = s.Event("close.bs.alert"))),
                    t.isDefaultPrevented() || (o.removeClass("in"), s.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(a.TRANSITION_DURATION) : n());
            });
        var t = s.fn.alert;
        (s.fn.alert = function (i) {
            return this.each(function () {
                var t = s(this),
                    e = t.data("bs.alert");
                e || t.data("bs.alert", (e = new a(this))), "string" == typeof i && e[i].call(t);
            });
        }),
            (s.fn.alert.Constructor = a),
            (s.fn.alert.noConflict = function () {
                return (s.fn.alert = t), this;
            }),
            s(document).on("click.bs.alert.data-api", e, a.prototype.close);
    })(jQuery),
    (function (s) {
        "use strict";
        var n = function (t, e) {
            (this.$element = s(t)), (this.options = s.extend({}, n.DEFAULTS, e)), (this.isLoading = !1);
        };
        function i(o) {
            return this.each(function () {
                var t = s(this),
                    e = t.data("bs.button"),
                    i = "object" == typeof o && o;
                e || t.data("bs.button", (e = new n(this, i))), "toggle" == o ? e.toggle() : o && e.setState(o);
            });
        }
        (n.VERSION = "5.2.0"),
            (n.DEFAULTS = { loadingText: "loading..." }),
            (n.prototype.setState = function (t) {
                var e = "disabled",
                    i = this.$element,
                    o = i.is("input") ? "val" : "html",
                    n = i.data();
                (t += "Text"),
                    null == n.resetText && i.data("resetText", i[o]()),
                    setTimeout(
                        s.proxy(function () {
                            i[o](null == n[t] ? this.options[t] : n[t]),
                                "loadingText" == t ? ((this.isLoading = !0), i.addClass(e).attr(e, e).prop(e, !0)) : this.isLoading && ((this.isLoading = !1), i.removeClass(e).removeAttr(e).prop(e, !1));
                        }, this),
                        0
                    );
            }),
            (n.prototype.toggle = function () {
                var t = !0,
                    e = this.$element.closest('[data-toggle="buttons"]');
                if (e.length) {
                    var i = this.$element.find("input");
                    "radio" == i.prop("type")
                        ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active"))
                        : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")),
                        i.prop("checked", this.$element.hasClass("active")),
                        t && i.trigger("change");
                } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
            });
        var t = s.fn.button;
        (s.fn.button = i),
            (s.fn.button.Constructor = n),
            (s.fn.button.noConflict = function () {
                return (s.fn.button = t), this;
            }),
            s(document)
                .on("click.bs.button.data-api", '[data-toggle^="button"]', function (t) {
                    var e = s(t.target).closest(".btn");
                    i.call(e, "toggle"), s(t.target).is('input[type="radio"], input[type="checkbox"]') || (t.preventDefault(), e.is("input,button") ? e.trigger("focus") : e.find("input:visible,button:visible").first().trigger("focus"));
                })
                .on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (t) {
                    s(t.target)
                        .closest(".btn")
                        .toggleClass("focus", /^focus(in)?$/.test(t.type));
                });
    })(jQuery),
    (function (p) {
        "use strict";
        var c = function (t, e) {
            (this.$element = p(t)),
                (this.$indicators = this.$element.find(".carousel-indicators")),
                (this.options = e),
                (this.paused = null),
                (this.sliding = null),
                (this.interval = null),
                (this.$active = null),
                (this.$items = null),
                this.options.keyboard && this.$element.on("keydown.bs.carousel", p.proxy(this.keydown, this)),
                "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", p.proxy(this.pause, this)).on("mouseleave.bs.carousel", p.proxy(this.cycle, this));
        };
        function a(n) {
            return this.each(function () {
                var t = p(this),
                    e = t.data("bs.carousel"),
                    i = p.extend({}, c.DEFAULTS, t.data(), "object" == typeof n && n),
                    o = "string" == typeof n ? n : i.slide;
                e || t.data("bs.carousel", (e = new c(this, i))), "number" == typeof n ? e.to(n) : o ? e[o]() : i.interval && e.pause().cycle();
            });
        }
        (c.VERSION = "5.2.0"),
            (c.TRANSITION_DURATION = 600),
            (c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }),
            (c.prototype.keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName)) {
                    switch (t.which) {
                        case 37:
                            this.prev();
                            break;
                        case 39:
                            this.next();
                            break;
                        default:
                            return;
                    }
                    t.preventDefault();
                }
            }),
            (c.prototype.cycle = function (t) {
                return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(p.proxy(this.next, this), this.options.interval)), this;
            }),
            (c.prototype.getItemIndex = function (t) {
                return (this.$items = t.parent().children(".item")), this.$items.index(t || this.$active);
            }),
            (c.prototype.getItemForDirection = function (t, e) {
                var i = this.getItemIndex(e);
                if ((("prev" == t && 0 === i) || ("next" == t && i == this.$items.length - 1)) && !this.options.wrap) return e;
                var o = (i + ("prev" == t ? -1 : 1)) % this.$items.length;
                return this.$items.eq(o);
            }),
            (c.prototype.to = function (t) {
                var e = this,
                    i = this.getItemIndex((this.$active = this.$element.find(".item.active")));
                if (!(t > this.$items.length - 1 || t < 0))
                    return this.sliding
                        ? this.$element.one("slid.bs.carousel", function () {
                              e.to(t);
                          })
                        : i == t
                        ? this.pause().cycle()
                        : this.slide(i < t ? "next" : "prev", this.$items.eq(t));
            }),
            (c.prototype.pause = function (t) {
                return t || (this.paused = !0), this.$element.find(".next, .prev").length && p.support.transition && (this.$element.trigger(p.support.transition.end), this.cycle(!0)), (this.interval = clearInterval(this.interval)), this;
            }),
            (c.prototype.next = function () {
                if (!this.sliding) return this.slide("next");
            }),
            (c.prototype.prev = function () {
                if (!this.sliding) return this.slide("prev");
            }),
            (c.prototype.slide = function (t, e) {
                var i = this.$element.find(".item.active"),
                    o = e || this.getItemForDirection(t, i),
                    n = this.interval,
                    s = "next" == t ? "left" : "right",
                    a = this;
                if (o.hasClass("active")) return (this.sliding = !1);
                var r = o[0],
                    l = p.Event("slide.bs.carousel", { relatedTarget: r, direction: s });
                if ((this.$element.trigger(l), !l.isDefaultPrevented())) {
                    if (((this.sliding = !0), n && this.pause(), this.$indicators.length)) {
                        this.$indicators.find(".active").removeClass("active");
                        var h = p(this.$indicators.children()[this.getItemIndex(o)]);
                        h && h.addClass("active");
                    }
                    var d = p.Event("slid.bs.carousel", { relatedTarget: r, direction: s });
                    return (
                        p.support.transition && this.$element.hasClass("slide")
                            ? (o.addClass(t),
                              o[0].offsetWidth,
                              i.addClass(s),
                              o.addClass(s),
                              i
                                  .one("bsTransitionEnd", function () {
                                      o.removeClass([t, s].join(" ")).addClass("active"),
                                          i.removeClass(["active", s].join(" ")),
                                          (a.sliding = !1),
                                          setTimeout(function () {
                                              a.$element.trigger(d);
                                          }, 0);
                                  })
                                  .emulateTransitionEnd(c.TRANSITION_DURATION))
                            : (i.removeClass("active"), o.addClass("active"), (this.sliding = !1), this.$element.trigger(d)),
                        n && this.cycle(),
                        this
                    );
                }
            });
        var t = p.fn.carousel;
        (p.fn.carousel = a),
            (p.fn.carousel.Constructor = c),
            (p.fn.carousel.noConflict = function () {
                return (p.fn.carousel = t), this;
            });
        var e = function (t) {
            var e,
                i = p(this),
                o = p(i.attr("data-target") || ((e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "")));
            if (o.hasClass("carousel")) {
                var n = p.extend({}, o.data(), i.data()),
                    s = i.attr("data-slide-to");
                s && (n.interval = !1), a.call(o, n), s && o.data("bs.carousel").to(s), t.preventDefault();
            }
        };
        p(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e),
            p(window).on("load", function () {
                p('[data-ride="carousel"]').each(function () {
                    var t = p(this);
                    a.call(t, t.data());
                });
            });
    })(jQuery),
    (function (a) {
        "use strict";
        var r = function (t, e) {
            (this.$element = a(t)),
                (this.options = a.extend({}, r.DEFAULTS, e)),
                (this.$trigger = a('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]')),
                (this.transitioning = null),
                this.options.parent ? (this.$parent = this.getParent()) : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
                this.options.toggle && this.toggle();
        };
        function n(t) {
            var e,
                i = t.attr("data-target") || ((e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""));
            return a(i);
        }
        function l(o) {
            return this.each(function () {
                var t = a(this),
                    e = t.data("bs.collapse"),
                    i = a.extend({}, r.DEFAULTS, t.data(), "object" == typeof o && o);
                !e && i.toggle && /show|hide/.test(o) && (i.toggle = !1), e || t.data("bs.collapse", (e = new r(this, i))), "string" == typeof o && e[o]();
            });
        }
        (r.VERSION = "5.2.0"),
            (r.TRANSITION_DURATION = 350),
            (r.DEFAULTS = { toggle: !0 }),
            (r.prototype.dimension = function () {
                return this.$element.hasClass("width") ? "width" : "height";
            }),
            (r.prototype.show = function () {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var t,
                        e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                    if (!(e && e.length && (t = e.data("bs.collapse")) && t.transitioning)) {
                        var i = a.Event("show.bs.collapse");
                        if ((this.$element.trigger(i), !i.isDefaultPrevented())) {
                            e && e.length && (l.call(e, "hide"), t || e.data("bs.collapse", null));
                            var o = this.dimension();
                            this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), (this.transitioning = 1);
                            var n = function () {
                                this.$element.removeClass("collapsing").addClass("collapse in")[o](""), (this.transitioning = 0), this.$element.trigger("shown.bs.collapse");
                            };
                            if (!a.support.transition) return n.call(this);
                            var s = a.camelCase(["scroll", o].join("-"));
                            this.$element.one("bsTransitionEnd", a.proxy(n, this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][s]);
                        }
                    }
                }
            }),
            (r.prototype.hide = function () {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var t = a.Event("hide.bs.collapse");
                    if ((this.$element.trigger(t), !t.isDefaultPrevented())) {
                        var e = this.dimension();
                        this.$element[e](this.$element[e]())[0].offsetHeight,
                            this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                            this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                            (this.transitioning = 1);
                        var i = function () {
                            (this.transitioning = 0), this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                        };
                        if (!a.support.transition) return i.call(this);
                        this.$element[e](0).one("bsTransitionEnd", a.proxy(i, this)).emulateTransitionEnd(r.TRANSITION_DURATION);
                    }
                }
            }),
            (r.prototype.toggle = function () {
                this[this.$element.hasClass("in") ? "hide" : "show"]();
            }),
            (r.prototype.getParent = function () {
                return a(this.options.parent)
                    .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
                    .each(
                        a.proxy(function (t, e) {
                            var i = a(e);
                            this.addAriaAndCollapsedClass(n(i), i);
                        }, this)
                    )
                    .end();
            }),
            (r.prototype.addAriaAndCollapsedClass = function (t, e) {
                var i = t.hasClass("in");
                t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i);
            });
        var t = a.fn.collapse;
        (a.fn.collapse = l),
            (a.fn.collapse.Constructor = r),
            (a.fn.collapse.noConflict = function () {
                return (a.fn.collapse = t), this;
            }),
            a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (t) {
                var e = a(this);
                e.attr("data-target") || t.preventDefault();
                var i = n(e),
                    o = i.data("bs.collapse") ? "toggle" : e.data();
                l.call(i, o);
            });
    })(jQuery),
    (function (a) {
        "use strict";
        var t = ".dropdown-backdrop",
            r = '[data-toggle="dropdown"]',
            o = function (t) {
                a(t).on("click.bs.dropdown", this.toggle);
            };
        function l(t) {
            var e = t.attr("data-target");
            e || (e = (e = t.attr("href")) && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
            var i = e && a(e);
            return i && i.length ? i : t.parent();
        }
        function s(o) {
            (o && 3 === o.which) ||
                (a(t).remove(),
                a(r).each(function () {
                    var t = a(this),
                        e = l(t),
                        i = { relatedTarget: this };
                    e.hasClass("open") &&
                        ((o && "click" == o.type && /input|textarea/i.test(o.target.tagName) && a.contains(e[0], o.target)) ||
                            (e.trigger((o = a.Event("hide.bs.dropdown", i))), o.isDefaultPrevented() || (t.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", i)))));
                }));
        }
        (o.VERSION = "5.2.0"),
            (o.prototype.toggle = function (t) {
                var e = a(this);
                if (!e.is(".disabled, :disabled")) {
                    var i = l(e),
                        o = i.hasClass("open");
                    if ((s(), !o)) {
                        "ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", s);
                        var n = { relatedTarget: this };
                        if ((i.trigger((t = a.Event("show.bs.dropdown", n))), t.isDefaultPrevented())) return;
                        e.trigger("focus").attr("aria-expanded", "true"), i.toggleClass("open").trigger(a.Event("shown.bs.dropdown", n));
                    }
                    return !1;
                }
            }),
            (o.prototype.keydown = function (t) {
                if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName)) {
                    var e = a(this);
                    if ((t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
                        var i = l(e),
                            o = i.hasClass("open");
                        if ((!o && 27 != t.which) || (o && 27 == t.which)) return 27 == t.which && i.find(r).trigger("focus"), e.trigger("click");
                        var n = i.find(".dropdown-menu li:not(.disabled):visible a");
                        if (n.length) {
                            var s = n.index(t.target);
                            38 == t.which && 0 < s && s--, 40 == t.which && s < n.length - 1 && s++, ~s || (s = 0), n.eq(s).trigger("focus");
                        }
                    }
                }
            });
        var e = a.fn.dropdown;
        (a.fn.dropdown = function (i) {
            return this.each(function () {
                var t = a(this),
                    e = t.data("bs.dropdown");
                e || t.data("bs.dropdown", (e = new o(this))), "string" == typeof i && e[i].call(t);
            });
        }),
            (a.fn.dropdown.Constructor = o),
            (a.fn.dropdown.noConflict = function () {
                return (a.fn.dropdown = e), this;
            }),
            a(document)
                .on("click.bs.dropdown.data-api", s)
                .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
                    t.stopPropagation();
                })
                .on("click.bs.dropdown.data-api", r, o.prototype.toggle)
                .on("keydown.bs.dropdown.data-api", r, o.prototype.keydown)
                .on("keydown.bs.dropdown.data-api", ".dropdown-menu", o.prototype.keydown);
    })(jQuery),
    (function (s) {
        "use strict";
        var a = function (t, e) {
            (this.options = e),
                (this.$body = s(document.body)),
                (this.$element = s(t)),
                (this.$dialog = this.$element.find(".modal-dialog")),
                (this.$backdrop = null),
                (this.isShown = null),
                (this.originalBodyPad = null),
                (this.scrollbarWidth = 0),
                (this.ignoreBackdropClick = !1),
                this.options.remote &&
                    this.$element.find(".modal-content").load(
                        this.options.remote,
                        s.proxy(function () {
                            this.$element.trigger("loaded.bs.modal");
                        }, this)
                    );
        };
        function r(o, n) {
            return this.each(function () {
                var t = s(this),
                    e = t.data("bs.modal"),
                    i = s.extend({}, a.DEFAULTS, t.data(), "object" == typeof o && o);
                e || t.data("bs.modal", (e = new a(this, i))), "string" == typeof o ? e[o](n) : i.show && e.show(n);
            });
        }
        (a.VERSION = "5.2.0"),
            (a.TRANSITION_DURATION = 300),
            (a.BACKDROP_TRANSITION_DURATION = 150),
            (a.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
            (a.prototype.toggle = function (t) {
                return this.isShown ? this.hide() : this.show(t);
            }),
            (a.prototype.show = function (i) {
                var o = this,
                    t = s.Event("show.bs.modal", { relatedTarget: i });
                this.$element.trigger(t),
                    this.isShown ||
                        t.isDefaultPrevented() ||
                        ((this.isShown = !0),
                        this.checkScrollbar(),
                        this.setScrollbar(),
                        this.$body.addClass("modal-open"),
                        this.escape(),
                        this.resize(),
                        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', s.proxy(this.hide, this)),
                        this.$dialog.on("mousedown.dismiss.bs.modal", function () {
                            o.$element.one("mouseup.dismiss.bs.modal", function (t) {
                                s(t.target).is(o.$element) && (o.ignoreBackdropClick = !0);
                            });
                        }),
                        this.backdrop(function () {
                            var t = s.support.transition && o.$element.hasClass("fade");
                            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.adjustDialog(), t && o.$element[0].offsetWidth, o.$element.addClass("in"), o.enforceFocus();
                            var e = s.Event("shown.bs.modal", { relatedTarget: i });
                            t
                                ? o.$dialog
                                      .one("bsTransitionEnd", function () {
                                          o.$element.trigger("focus").trigger(e);
                                      })
                                      .emulateTransitionEnd(a.TRANSITION_DURATION)
                                : o.$element.trigger("focus").trigger(e);
                        }));
            }),
            (a.prototype.hide = function (t) {
                t && t.preventDefault(),
                    (t = s.Event("hide.bs.modal")),
                    this.$element.trigger(t),
                    this.isShown &&
                        !t.isDefaultPrevented() &&
                        ((this.isShown = !1),
                        this.escape(),
                        this.resize(),
                        s(document).off("focusin.bs.modal"),
                        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
                        this.$dialog.off("mousedown.dismiss.bs.modal"),
                        s.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", s.proxy(this.hideModal, this)).emulateTransitionEnd(a.TRANSITION_DURATION) : this.hideModal());
            }),
            (a.prototype.enforceFocus = function () {
                s(document)
                    .off("focusin.bs.modal")
                    .on(
                        "focusin.bs.modal",
                        s.proxy(function (t) {
                            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus");
                        }, this)
                    );
            }),
            (a.prototype.escape = function () {
                this.isShown && this.options.keyboard
                    ? this.$element.on(
                          "keydown.dismiss.bs.modal",
                          s.proxy(function (t) {
                              27 == t.which && this.hide();
                          }, this)
                      )
                    : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
            }),
            (a.prototype.resize = function () {
                this.isShown ? s(window).on("resize.bs.modal", s.proxy(this.handleUpdate, this)) : s(window).off("resize.bs.modal");
            }),
            (a.prototype.hideModal = function () {
                var t = this;
                this.$element.hide(),
                    this.backdrop(function () {
                        t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal");
                    });
            }),
            (a.prototype.removeBackdrop = function () {
                this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
            }),
            (a.prototype.backdrop = function (t) {
                var e = this,
                    i = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var o = s.support.transition && i;
                    if (
                        ((this.$backdrop = s(document.createElement("div"))
                            .addClass("modal-backdrop " + i)
                            .appendTo(this.$body)),
                        this.$element.on(
                            "click.dismiss.bs.modal",
                            s.proxy(function (t) {
                                this.ignoreBackdropClick ? (this.ignoreBackdropClick = !1) : t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide());
                            }, this)
                        ),
                        o && this.$backdrop[0].offsetWidth,
                        this.$backdrop.addClass("in"),
                        !t)
                    )
                        return;
                    o ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(a.BACKDROP_TRANSITION_DURATION) : t();
                } else if (!this.isShown && this.$backdrop) {
                    this.$backdrop.removeClass("in");
                    var n = function () {
                        e.removeBackdrop(), t && t();
                    };
                    s.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", n).emulateTransitionEnd(a.BACKDROP_TRANSITION_DURATION) : n();
                } else t && t();
            }),
            (a.prototype.handleUpdate = function () {
                this.adjustDialog();
            }),
            (a.prototype.adjustDialog = function () {
                var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
                this.$element.css({ paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : "" });
            }),
            (a.prototype.resetAdjustments = function () {
                this.$element.css({ paddingLeft: "", paddingRight: "" });
            }),
            (a.prototype.checkScrollbar = function () {
                var t = window.innerWidth;
                if (!t) {
                    var e = document.documentElement.getBoundingClientRect();
                    t = e.right - Math.abs(e.left);
                }
                (this.bodyIsOverflowing = document.body.clientWidth < t), (this.scrollbarWidth = this.measureScrollbar());
            }),
            (a.prototype.setScrollbar = function () {
                var t = parseInt(this.$body.css("padding-right") || 0, 10);
                (this.originalBodyPad = document.body.style.paddingRight || ""), this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth);
            }),
            (a.prototype.resetScrollbar = function () {
                this.$body.css("padding-right", this.originalBodyPad);
            }),
            (a.prototype.measureScrollbar = function () {
                var t = document.createElement("div");
                (t.className = "modal-scrollbar-measure"), this.$body.append(t);
                var e = t.offsetWidth - t.clientWidth;
                return this.$body[0].removeChild(t), e;
            });
        var t = s.fn.modal;
        (s.fn.modal = r),
            (s.fn.modal.Constructor = a),
            (s.fn.modal.noConflict = function () {
                return (s.fn.modal = t), this;
            }),
            s(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
                var e = s(this),
                    i = e.attr("href"),
                    o = s(e.attr("data-target") || (i && i.replace(/.*(?=#[^\s]+$)/, ""))),
                    n = o.data("bs.modal") ? "toggle" : s.extend({ remote: !/#/.test(i) && i }, o.data(), e.data());
                e.is("a") && t.preventDefault(),
                    o.one("show.bs.modal", function (t) {
                        t.isDefaultPrevented() ||
                            o.one("hidden.bs.modal", function () {
                                e.is(":visible") && e.trigger("focus");
                            });
                    }),
                    r.call(o, n, this);
            });
    })(jQuery),
    (function (g) {
        "use strict";
        var m = function (t, e) {
            (this.type = null), (this.options = null), (this.enabled = null), (this.timeout = null), (this.hoverState = null), (this.$element = null), (this.inState = null), this.init("tooltip", t, e);
        };
        (m.VERSION = "5.2.0"),
            (m.TRANSITION_DURATION = 150),
            (m.DEFAULTS = {
                animation: !0,
                placement: "top",
                selector: !1,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                container: !1,
                viewport: { selector: "body", padding: 0 },
            }),
            (m.prototype.init = function (t, e, i) {
                if (
                    ((this.enabled = !0),
                    (this.type = t),
                    (this.$element = g(e)),
                    (this.options = this.getOptions(i)),
                    (this.$viewport = this.options.viewport && g(g.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport)),
                    (this.inState = { click: !1, hover: !1, focus: !1 }),
                    this.$element[0] instanceof document.constructor && !this.options.selector)
                )
                    throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
                for (var o = this.options.trigger.split(" "), n = o.length; n--; ) {
                    var s = o[n];
                    if ("click" == s) this.$element.on("click." + this.type, this.options.selector, g.proxy(this.toggle, this));
                    else if ("manual" != s) {
                        var a = "hover" == s ? "mouseenter" : "focusin",
                            r = "hover" == s ? "mouseleave" : "focusout";
                        this.$element.on(a + "." + this.type, this.options.selector, g.proxy(this.enter, this)), this.$element.on(r + "." + this.type, this.options.selector, g.proxy(this.leave, this));
                    }
                }
                this.options.selector ? (this._options = g.extend({}, this.options, { trigger: "manual", selector: "" })) : this.fixTitle();
            }),
            (m.prototype.getDefaults = function () {
                return m.DEFAULTS;
            }),
            (m.prototype.getOptions = function (t) {
                return (t = g.extend({}, this.getDefaults(), this.$element.data(), t)).delay && "number" == typeof t.delay && (t.delay = { show: t.delay, hide: t.delay }), t;
            }),
            (m.prototype.getDelegateOptions = function () {
                var i = {},
                    o = this.getDefaults();
                return (
                    this._options &&
                        g.each(this._options, function (t, e) {
                            o[t] != e && (i[t] = e);
                        }),
                    i
                );
            }),
            (m.prototype.enter = function (t) {
                var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
                if (
                    (e || ((e = new this.constructor(t.currentTarget, this.getDelegateOptions())), g(t.currentTarget).data("bs." + this.type, e)),
                    t instanceof g.Event && (e.inState["focusin" == t.type ? "focus" : "hover"] = !0),
                    e.tip().hasClass("in") || "in" == e.hoverState)
                )
                    e.hoverState = "in";
                else {
                    if ((clearTimeout(e.timeout), (e.hoverState = "in"), !e.options.delay || !e.options.delay.show)) return e.show();
                    e.timeout = setTimeout(function () {
                        "in" == e.hoverState && e.show();
                    }, e.options.delay.show);
                }
            }),
            (m.prototype.isInStateTrue = function () {
                for (var t in this.inState) if (this.inState[t]) return !0;
                return !1;
            }),
            (m.prototype.leave = function (t) {
                var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
                if (
                    (e || ((e = new this.constructor(t.currentTarget, this.getDelegateOptions())), g(t.currentTarget).data("bs." + this.type, e)),
                    t instanceof g.Event && (e.inState["focusout" == t.type ? "focus" : "hover"] = !1),
                    !e.isInStateTrue())
                ) {
                    if ((clearTimeout(e.timeout), (e.hoverState = "out"), !e.options.delay || !e.options.delay.hide)) return e.hide();
                    e.timeout = setTimeout(function () {
                        "out" == e.hoverState && e.hide();
                    }, e.options.delay.hide);
                }
            }),
            (m.prototype.show = function () {
                var t = g.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                    this.$element.trigger(t);
                    var e = g.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                    if (t.isDefaultPrevented() || !e) return;
                    var i = this,
                        o = this.tip(),
                        n = this.getUID(this.type);
                    this.setContent(), o.attr("id", n), this.$element.attr("aria-describedby", n), this.options.animation && o.addClass("fade");
                    var s = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                        a = /\s?auto?\s?/i,
                        r = a.test(s);
                    r && (s = s.replace(a, "") || "top"),
                        o
                            .detach()
                            .css({ top: 0, left: 0, display: "block" })
                            .addClass(s)
                            .data("bs." + this.type, this),
                        this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element),
                        this.$element.trigger("inserted.bs." + this.type);
                    var l = this.getPosition(),
                        h = o[0].offsetWidth,
                        d = o[0].offsetHeight;
                    if (r) {
                        var p = s,
                            c = this.getPosition(this.$viewport);
                        (s = "bottom" == s && l.bottom + d > c.bottom ? "top" : "top" == s && l.top - d < c.top ? "bottom" : "right" == s && l.right + h > c.width ? "left" : "left" == s && l.left - h < c.left ? "right" : s),
                            o.removeClass(p).addClass(s);
                    }
                    var f = this.getCalculatedOffset(s, l, h, d);
                    this.applyPlacement(f, s);
                    var u = function () {
                        var t = i.hoverState;
                        i.$element.trigger("shown.bs." + i.type), (i.hoverState = null), "out" == t && i.leave(i);
                    };
                    g.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", u).emulateTransitionEnd(m.TRANSITION_DURATION) : u();
                }
            }),
            (m.prototype.applyPlacement = function (t, e) {
                var i = this.tip(),
                    o = i[0].offsetWidth,
                    n = i[0].offsetHeight,
                    s = parseInt(i.css("margin-top"), 10),
                    a = parseInt(i.css("margin-left"), 10);
                isNaN(s) && (s = 0),
                    isNaN(a) && (a = 0),
                    (t.top += s),
                    (t.left += a),
                    g.offset.setOffset(
                        i[0],
                        g.extend(
                            {
                                using: function (t) {
                                    i.css({ top: Math.round(t.top), left: Math.round(t.left) });
                                },
                            },
                            t
                        ),
                        0
                    ),
                    i.addClass("in");
                var r = i[0].offsetWidth,
                    l = i[0].offsetHeight;
                "top" == e && l != n && (t.top = t.top + n - l);
                var h = this.getViewportAdjustedDelta(e, t, r, l);
                h.left ? (t.left += h.left) : (t.top += h.top);
                var d = /top|bottom/.test(e),
                    p = d ? 2 * h.left - o + r : 2 * h.top - n + l,
                    c = d ? "offsetWidth" : "offsetHeight";
                i.offset(t), this.replaceArrow(p, i[0][c], d);
            }),
            (m.prototype.replaceArrow = function (t, e, i) {
                this.arrow()
                    .css(i ? "left" : "top", 50 * (1 - t / e) + "%")
                    .css(i ? "top" : "left", "");
            }),
            (m.prototype.setContent = function () {
                var t = this.tip(),
                    e = this.getTitle();
                t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right");
            }),
            (m.prototype.hide = function (t) {
                var e = this,
                    i = g(this.$tip),
                    o = g.Event("hide.bs." + this.type);
                function n() {
                    "in" != e.hoverState && i.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), t && t();
                }
                if ((this.$element.trigger(o), !o.isDefaultPrevented()))
                    return i.removeClass("in"), g.support.transition && i.hasClass("fade") ? i.one("bsTransitionEnd", n).emulateTransitionEnd(m.TRANSITION_DURATION) : n(), (this.hoverState = null), this;
            }),
            (m.prototype.fixTitle = function () {
                var t = this.$element;
                (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "");
            }),
            (m.prototype.hasContent = function () {
                return this.getTitle();
            }),
            (m.prototype.getPosition = function (t) {
                var e = (t = t || this.$element)[0],
                    i = "BODY" == e.tagName,
                    o = e.getBoundingClientRect();
                null == o.width && (o = g.extend({}, o, { width: o.right - o.left, height: o.bottom - o.top }));
                var n = window.SVGElement && e instanceof window.SVGElement,
                    s = i ? { top: 0, left: 0 } : n ? null : t.offset(),
                    a = { scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop() },
                    r = i ? { width: g(window).width(), height: g(window).height() } : null;
                return g.extend({}, o, a, r, s);
            }),
            (m.prototype.getCalculatedOffset = function (t, e, i, o) {
                return "bottom" == t
                    ? { top: e.top + e.height, left: e.left + e.width / 2 - i / 2 }
                    : "top" == t
                    ? { top: e.top - o, left: e.left + e.width / 2 - i / 2 }
                    : "left" == t
                    ? { top: e.top + e.height / 2 - o / 2, left: e.left - i }
                    : { top: e.top + e.height / 2 - o / 2, left: e.left + e.width };
            }),
            (m.prototype.getViewportAdjustedDelta = function (t, e, i, o) {
                var n = { top: 0, left: 0 };
                if (!this.$viewport) return n;
                var s = (this.options.viewport && this.options.viewport.padding) || 0,
                    a = this.getPosition(this.$viewport);
                if (/right|left/.test(t)) {
                    var r = e.top - s - a.scroll,
                        l = e.top + s - a.scroll + o;
                    r < a.top ? (n.top = a.top - r) : l > a.top + a.height && (n.top = a.top + a.height - l);
                } else {
                    var h = e.left - s,
                        d = e.left + s + i;
                    h < a.left ? (n.left = a.left - h) : d > a.right && (n.left = a.left + a.width - d);
                }
                return n;
            }),
            (m.prototype.getTitle = function () {
                var t = this.$element,
                    e = this.options;
                return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title);
            }),
            (m.prototype.getUID = function (t) {
                for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
                return t;
            }),
            (m.prototype.tip = function () {
                if (!this.$tip && ((this.$tip = g(this.options.template)), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
                return this.$tip;
            }),
            (m.prototype.arrow = function () {
                return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
            }),
            (m.prototype.enable = function () {
                this.enabled = !0;
            }),
            (m.prototype.disable = function () {
                this.enabled = !1;
            }),
            (m.prototype.toggleEnabled = function () {
                this.enabled = !this.enabled;
            }),
            (m.prototype.toggle = function (t) {
                var e = this;
                t && ((e = g(t.currentTarget).data("bs." + this.type)) || ((e = new this.constructor(t.currentTarget, this.getDelegateOptions())), g(t.currentTarget).data("bs." + this.type, e))),
                    t ? ((e.inState.click = !e.inState.click), e.isInStateTrue() ? e.enter(e) : e.leave(e)) : e.tip().hasClass("in") ? e.leave(e) : e.enter(e);
            }),
            (m.prototype.destroy = function () {
                var t = this;
                clearTimeout(this.timeout),
                    this.hide(function () {
                        t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), (t.$tip = null), (t.$arrow = null), (t.$viewport = null), (t.$element = null);
                    });
            });
        var t = g.fn.tooltip;
        (g.fn.tooltip = function (o) {
            return this.each(function () {
                var t = g(this),
                    e = t.data("bs.tooltip"),
                    i = "object" == typeof o && o;
                (!e && /destroy|hide/.test(o)) || (e || t.data("bs.tooltip", (e = new m(this, i))), "string" == typeof o && e[o]());
            });
        }),
            (g.fn.tooltip.Constructor = m),
            (g.fn.tooltip.noConflict = function () {
                return (g.fn.tooltip = t), this;
            });
    })(jQuery),
    (function (n) {
        "use strict";
        var s = function (t, e) {
            this.init("popover", t, e);
        };
        if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
        (s.VERSION = "5.2.0"),
            (s.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
            })),
            (s.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype)),
            ((s.prototype.constructor = s).prototype.getDefaults = function () {
                return s.DEFAULTS;
            }),
            (s.prototype.setContent = function () {
                var t = this.tip(),
                    e = this.getTitle(),
                    i = this.getContent();
                t.find(".popover-title")[this.options.html ? "html" : "text"](e),
                    t.find(".popover-content").children().detach().end()[this.options.html ? ("string" == typeof i ? "html" : "append") : "text"](i),
                    t.removeClass("fade top bottom left right in"),
                    t.find(".popover-title").html() || t.find(".popover-title").hide();
            }),
            (s.prototype.hasContent = function () {
                return this.getTitle() || this.getContent();
            }),
            (s.prototype.getContent = function () {
                var t = this.$element,
                    e = this.options;
                return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content);
            }),
            (s.prototype.arrow = function () {
                return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
            });
        var t = n.fn.popover;
        (n.fn.popover = function (o) {
            return this.each(function () {
                var t = n(this),
                    e = t.data("bs.popover"),
                    i = "object" == typeof o && o;
                (!e && /destroy|hide/.test(o)) || (e || t.data("bs.popover", (e = new s(this, i))), "string" == typeof o && e[o]());
            });
        }),
            (n.fn.popover.Constructor = s),
            (n.fn.popover.noConflict = function () {
                return (n.fn.popover = t), this;
            });
    })(jQuery),
    (function (s) {
        "use strict";
        function n(t, e) {
            (this.$body = s(document.body)),
                (this.$scrollElement = s(t).is(document.body) ? s(window) : s(t)),
                (this.options = s.extend({}, n.DEFAULTS, e)),
                (this.selector = (this.options.target || "") + " .nav li > a"),
                (this.offsets = []),
                (this.targets = []),
                (this.activeTarget = null),
                (this.scrollHeight = 0),
                this.$scrollElement.on("scroll.bs.scrollspy", s.proxy(this.process, this)),
                this.refresh(),
                this.process();
        }
        function e(o) {
            return this.each(function () {
                var t = s(this),
                    e = t.data("bs.scrollspy"),
                    i = "object" == typeof o && o;
                e || t.data("bs.scrollspy", (e = new n(this, i))), "string" == typeof o && e[o]();
            });
        }
        (n.VERSION = "5.2.0"),
            (n.DEFAULTS = { offset: 10 }),
            (n.prototype.getScrollHeight = function () {
                return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
            }),
            (n.prototype.refresh = function () {
                var t = this,
                    o = "offset",
                    n = 0;
                (this.offsets = []),
                    (this.targets = []),
                    (this.scrollHeight = this.getScrollHeight()),
                    s.isWindow(this.$scrollElement[0]) || ((o = "position"), (n = this.$scrollElement.scrollTop())),
                    this.$body
                        .find(this.selector)
                        .map(function () {
                            var t = s(this),
                                e = t.data("target") || t.attr("href"),
                                i = /^#./.test(e) && s(e);
                            return (i && i.length && i.is(":visible") && [[i[o]().top + n, e]]) || null;
                        })
                        .sort(function (t, e) {
                            return t[0] - e[0];
                        })
                        .each(function () {
                            t.offsets.push(this[0]), t.targets.push(this[1]);
                        });
            }),
            (n.prototype.process = function () {
                var t,
                    e = this.$scrollElement.scrollTop() + this.options.offset,
                    i = this.getScrollHeight(),
                    o = this.options.offset + i - this.$scrollElement.height(),
                    n = this.offsets,
                    s = this.targets,
                    a = this.activeTarget;
                if ((this.scrollHeight != i && this.refresh(), o <= e)) return a != (t = s[s.length - 1]) && this.activate(t);
                if (a && e < n[0]) return (this.activeTarget = null), this.clear();
                for (t = n.length; t--; ) a != s[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(s[t]);
            }),
            (n.prototype.activate = function (t) {
                (this.activeTarget = t), this.clear();
                var e = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
                    i = s(e).parents("li").addClass("active");
                i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy");
            }),
            (n.prototype.clear = function () {
                s(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
            });
        var t = s.fn.scrollspy;
        (s.fn.scrollspy = e),
            (s.fn.scrollspy.Constructor = n),
            (s.fn.scrollspy.noConflict = function () {
                return (s.fn.scrollspy = t), this;
            }),
            s(window).on("load.bs.scrollspy.data-api", function () {
                s('[data-spy="scroll"]').each(function () {
                    var t = s(this);
                    e.call(t, t.data());
                });
            });
    })(jQuery),
    (function (r) {
        "use strict";
        var a = function (t) {
            this.element = r(t);
        };
        function e(i) {
            return this.each(function () {
                var t = r(this),
                    e = t.data("bs.tab");
                e || t.data("bs.tab", (e = new a(this))), "string" == typeof i && e[i]();
            });
        }
        (a.VERSION = "5.2.0"),
            (a.TRANSITION_DURATION = 150),
            (a.prototype.show = function () {
                var t = this.element,
                    e = t.closest("ul:not(.dropdown-menu)"),
                    i = t.data("target");
                if ((i || (i = (i = t.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active"))) {
                    var o = e.find(".active:last a"),
                        n = r.Event("hide.bs.tab", { relatedTarget: t[0] }),
                        s = r.Event("show.bs.tab", { relatedTarget: o[0] });
                    if ((o.trigger(n), t.trigger(s), !s.isDefaultPrevented() && !n.isDefaultPrevented())) {
                        var a = r(i);
                        this.activate(t.closest("li"), e),
                            this.activate(a, a.parent(), function () {
                                o.trigger({ type: "hidden.bs.tab", relatedTarget: t[0] }), t.trigger({ type: "shown.bs.tab", relatedTarget: o[0] });
                            });
                    }
                }
            }),
            (a.prototype.activate = function (t, e, i) {
                var o = e.find("> .active"),
                    n = i && r.support.transition && ((o.length && o.hasClass("fade")) || !!e.find("> .fade").length);
                function s() {
                    o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
                        t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
                        n ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"),
                        t.parent(".dropdown-menu").length && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
                        i && i();
                }
                o.length && n ? o.one("bsTransitionEnd", s).emulateTransitionEnd(a.TRANSITION_DURATION) : s(), o.removeClass("in");
            });
        var t = r.fn.tab;
        (r.fn.tab = e),
            (r.fn.tab.Constructor = a),
            (r.fn.tab.noConflict = function () {
                return (r.fn.tab = t), this;
            });
        var i = function (t) {
            t.preventDefault(), e.call(r(this), "show");
        };
        r(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i);
    })(jQuery),
    (function (l) {
        "use strict";
        var h = function (t, e) {
            (this.options = l.extend({}, h.DEFAULTS, e)),
                (this.$target = l(this.options.target).on("scroll.bs.affix.data-api", l.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", l.proxy(this.checkPositionWithEventLoop, this))),
                (this.$element = l(t)),
                (this.affixed = null),
                (this.unpin = null),
                (this.pinnedOffset = null),
                this.checkPosition();
        };
        function i(o) {
            return this.each(function () {
                var t = l(this),
                    e = t.data("bs.affix"),
                    i = "object" == typeof o && o;
                e || t.data("bs.affix", (e = new h(this, i))), "string" == typeof o && e[o]();
            });
        }
        (h.VERSION = "5.2.0"),
            (h.RESET = "affix affix-top affix-bottom"),
            (h.DEFAULTS = { offset: 0, target: window }),
            (h.prototype.getState = function (t, e, i, o) {
                var n = this.$target.scrollTop(),
                    s = this.$element.offset(),
                    a = this.$target.height();
                if (null != i && "top" == this.affixed) return n < i && "top";
                if ("bottom" == this.affixed) return null != i ? !(n + this.unpin <= s.top) && "bottom" : !(n + a <= t - o) && "bottom";
                var r = null == this.affixed,
                    l = r ? n : s.top;
                return null != i && n <= i ? "top" : null != o && t - o <= l + (r ? a : e) && "bottom";
            }),
            (h.prototype.getPinnedOffset = function () {
                if (this.pinnedOffset) return this.pinnedOffset;
                this.$element.removeClass(h.RESET).addClass("affix");
                var t = this.$target.scrollTop(),
                    e = this.$element.offset();
                return (this.pinnedOffset = e.top - t);
            }),
            (h.prototype.checkPositionWithEventLoop = function () {
                setTimeout(l.proxy(this.checkPosition, this), 1);
            }),
            (h.prototype.checkPosition = function () {
                if (this.$element.is(":visible")) {
                    var t = this.$element.height(),
                        e = this.options.offset,
                        i = e.top,
                        o = e.bottom,
                        n = Math.max(l(document).height(), l(document.body).height());
                    "object" != typeof e && (o = i = e), "function" == typeof i && (i = e.top(this.$element)), "function" == typeof o && (o = e.bottom(this.$element));
                    var s = this.getState(n, t, i, o);
                    if (this.affixed != s) {
                        null != this.unpin && this.$element.css("top", "");
                        var a = "affix" + (s ? "-" + s : ""),
                            r = l.Event(a + ".bs.affix");
                        if ((this.$element.trigger(r), r.isDefaultPrevented())) return;
                        (this.affixed = s),
                            (this.unpin = "bottom" == s ? this.getPinnedOffset() : null),
                            this.$element
                                .removeClass(h.RESET)
                                .addClass(a)
                                .trigger(a.replace("affix", "affixed") + ".bs.affix");
                    }
                    "bottom" == s && this.$element.offset({ top: n - t - o });
                }
            });
        var t = l.fn.affix;
        (l.fn.affix = i),
            (l.fn.affix.Constructor = h),
            (l.fn.affix.noConflict = function () {
                return (l.fn.affix = t), this;
            }),
            l(window).on("load", function () {
                l('[data-spy="affix"]').each(function () {
                    var t = l(this),
                        e = t.data();
                    (e.offset = e.offset || {}), null != e.offsetBottom && (e.offset.bottom = e.offsetBottom), null != e.offsetTop && (e.offset.top = e.offsetTop), i.call(t, e);
                });
            });
    })(jQuery);
/*!fullPage 2.7.9*/
!(function (e, n) {
    "use strict";
    "function" == typeof define && define.amd
        ? define(["jquery"], function (o) {
              return n(o, e, e.document, e.Math);
          })
        : "undefined" != typeof exports
        ? (module.exports = n(require("jquery"), e, e.document, e.Math))
        : n(jQuery, e, e.document, e.Math);
})("undefined" != typeof window ? window : this, function (e, n, o, t, i) {
    "use strict";
    var l,
        r = "fullpage-wrapper",
        a = "." + r,
        s = "fp-scrollable",
        c = "." + s,
        d = ".slimScrollBar",
        f = ".slimScrollRail",
        u = "fp-responsive",
        h = "fp-notransition",
        p = "fp-destroyed",
        v = "fp-enabled",
        g = "fp-viewing",
        m = "active",
        S = "." + m,
        w = "fp-completely",
        y = "." + w,
        b = ".section",
        x = "fp-section",
        T = "." + x,
        C = T + S,
        k = T + ":first",
        A = T + ":last",
        L = "fp-tableCell",
        B = "." + L,
        E = "fp-auto-height",
        M = "fp-normal-scroll",
        H = "fp-nav",
        R = "#" + H,
        O = "fp-tooltip",
        z = "." + O,
        D = "fp-show-active",
        P = ".fpslide",
        I = "fp-slide",
        F = "." + I,
        V = F + S,
        q = "fp-slides",
        W = "." + q,
        Y = "fp-slidesContainer",
        U = "." + Y,
        X = "fp-table",
        N = "fp-slidesNav",
        K = "." + N,
        j = K + " a",
        Q = "fp-controlArrow",
        G = "." + Q,
        J = "fp-prev",
        Z = "." + J,
        $ = Q + " " + J,
        _ = G + Z,
        ee = "fp-next",
        ne = "." + ee,
        oe = Q + " " + ee,
        te = G + ne,
        ie = e(n),
        le = e(o);
    e.fn.fullpage = function (s) {
        function c() {
            s.css3 && (s.css3 = Sn()), (s.scrollBar = s.scrollBar || s.hybrid), f(), Q(), In.setAllowScrolling(!0), In.setAutoScrolling(s.autoScrolling, "internal");
            var n = e(C).find(V);
            n.length && (0 !== e(C).index(T) || (0 === e(C).index(T) && 0 !== n.index())) && Ln(n),
                Ge(),
                mn(),
                ie.on("load", function () {
                    ze();
                });
        }
        function d() {
            ie.on("scroll", fe).on("hashchange", De).blur(Ye).resize(Qe),
                le
                    .keydown(Pe)
                    .keyup(Fe)
                    .on("click touchstart", R + " a", Ue)
                    .on("click touchstart", j, Xe)
                    .on("click", z, Ie),
                e(T).on("click touchstart", G, We),
                s.normalScrollElements &&
                    (le.on("mouseenter", s.normalScrollElements, function () {
                        In.setMouseWheelScrolling(!1);
                    }),
                    le.on("mouseleave", s.normalScrollElements, function () {
                        In.setMouseWheelScrolling(!0);
                    }));
        }
        function f() {
            s.anchors.length ||
                (s.anchors = e(s.sectionSelector + "[data-anchor]")
                    .map(function () {
                        return e(this).data("anchor").toString();
                    })
                    .get()),
                s.navigationTooltips.length ||
                    (s.navigationTooltips = e(s.sectionSelector + "[data-tooltip]")
                        .map(function () {
                            return e(this).data("tooltip").toString();
                        })
                        .get());
        }
        function Q() {
            Xn.css({ height: "100%", position: "relative" }),
                Xn.addClass(r),
                e("html").addClass(v),
                (Nn = ie.height()),
                Xn.removeClass(p),
                re(),
                e(T).each(function (n) {
                    var o = e(this),
                        t = o.find(F),
                        i = t.length;
                    ee(o, n), ne(o, n), i > 0 ? Z(o, t, i) : s.verticalCentered && rn(o);
                }),
                s.fixedElements && s.css3 && e(s.fixedElements).appendTo(Pn),
                s.navigation && se(),
                s.scrollOverflow ? ("complete" === o.readyState && ce(), ie.on("load", ce)) : de();
        }
        function Z(n, o, t) {
            var i = 100 * t,
                l = 100 / t;
            o.wrapAll('<div class="' + Y + '" />'),
                o.parent().wrap('<div class="' + q + '" />'),
                n.find(U).css("width", i + "%"),
                t > 1 && (s.controlArrows && ae(n), s.slidesNavigation && hn(n, t)),
                o.each(function (n) {
                    e(this).css("width", l + "%"), s.verticalCentered && rn(e(this));
                });
            var r = n.find(V);
            r.length && (0 !== e(C).index(T) || (0 === e(C).index(T) && 0 !== r.index())) ? Ln(r) : o.eq(0).addClass(m);
        }
        function ee(n, o) {
            o || 0 !== e(C).length || n.addClass(m),
                n.css("height", Nn + "px"),
                s.paddingTop && n.css("padding-top", s.paddingTop),
                s.paddingBottom && n.css("padding-bottom", s.paddingBottom),
                "undefined" != typeof s.sectionsColor[o] && n.css("background-color", s.sectionsColor[o]),
                "undefined" != typeof s.anchors[o] && n.attr("data-anchor", s.anchors[o]);
        }
        function ne(n, o) {
            "undefined" != typeof s.anchors[o] && n.hasClass(m) && nn(s.anchors[o], o), s.menu && s.css3 && e(s.menu).closest(a).length && e(s.menu).appendTo(Pn);
        }
        function re() {
            e(s.sectionSelector).each(function () {
                e(this).addClass(x);
            }),
                e(s.slideSelector).each(function () {
                    e(this).addClass(I);
                });
        }
        function ae(e) {
            e.find(W).after('<div class="' + $ + '"></div><div class="' + oe + '"></div>'),
                "#fff" != s.controlArrowColor &&
                    (e.find(te).css("border-color", "transparent transparent transparent " + s.controlArrowColor), e.find(_).css("border-color", "transparent " + s.controlArrowColor + " transparent transparent")),
                s.loopHorizontal || e.find(_).hide();
        }
        function se() {
            Pn.append('<div id="' + H + '"><ul></ul></div>');
            var n = e(R);
            n.addClass(function () {
                return s.showActiveTooltip ? D + " " + s.navigationPosition : s.navigationPosition;
            });
            for (var o = 0; o < e(T).length; o++) {
                var t = "";
                s.anchors.length && (t = s.anchors[o]);
                var i = '<li><a href="#' + t + '"><span></span></a>',
                    l = s.navigationTooltips[o];
                "undefined" != typeof l && "" !== l && (i += '<div class="' + O + " " + s.navigationPosition + '">' + l + "</div>"), (i += "</li>"), n.find("ul").append(i);
            }
            e(R).css("margin-top", "-" + e(R).height() / 2 + "px"), e(R).find("li").eq(e(C).index(T)).find("a").addClass(m);
        }
        function ce() {
            e(T).each(function () {
                var n = e(this).find(F);
                n.length
                    ? n.each(function () {
                          ln(e(this));
                      })
                    : ln(e(this));
            }),
                de();
        }
        function de() {
            var n = e(C);
            n.addClass(w),
                s.scrollOverflowHandler.afterRender && s.scrollOverflowHandler.afterRender(n),
                Me(n),
                He(n),
                e.isFunction(s.afterLoad) && s.afterLoad.call(n, n.data("anchor"), n.index(T) + 1),
                e.isFunction(s.afterRender) && s.afterRender.call(Xn);
        }
        function fe() {
            var n;
            if (!s.autoScrolling || s.scrollBar) {
                for (var t = ie.scrollTop(), i = he(t), l = 0, r = t + ie.height() / 2, a = o.querySelectorAll(T), c = 0; c < a.length; ++c) {
                    var d = a[c];
                    d.offsetTop <= r && (l = c);
                }
                if ((ue(i) && (e(C).hasClass(w) || e(C).addClass(w).siblings().removeClass(w)), (n = e(a).eq(l)), !n.hasClass(m))) {
                    io = !0;
                    var f = e(C),
                        u = f.index(T) + 1,
                        h = on(n),
                        p = n.data("anchor"),
                        v = n.index(T) + 1,
                        g = n.find(V);
                    if (g.length)
                        var S = g.data("anchor"),
                            y = g.index();
                    Qn &&
                        (n.addClass(m).siblings().removeClass(m),
                        e.isFunction(s.onLeave) && s.onLeave.call(f, u, v, h),
                        e.isFunction(s.afterLoad) && s.afterLoad.call(n, p, v),
                        Me(n),
                        nn(p, v - 1),
                        s.anchors.length && ((Fn = p), pn(y, S, p, v))),
                        clearTimeout(eo),
                        (eo = setTimeout(function () {
                            io = !1;
                        }, 100));
                }
                s.fitToSection &&
                    (clearTimeout(no),
                    (no = setTimeout(function () {
                        Qn && s.fitToSection && (e(C).is(n) && (Kn = !0), Ce(e(C)), (Kn = !1));
                    }, s.fitToSectionDelay)));
            }
        }
        function ue(n) {
            var o = e(C).position().top,
                t = o + ie.height();
            return "up" == n ? t >= ie.scrollTop() + ie.height() : o <= ie.scrollTop();
        }
        function he(e) {
            var n = e > lo ? "down" : "up";
            return (lo = e), n;
        }
        function pe(e, n) {
            if (Jn.m[e]) {
                var o, t;
                if (("down" == e ? ((o = "bottom"), (t = In.moveSectionDown)) : ((o = "top"), (t = In.moveSectionUp)), n.length > 0)) {
                    if (!s.scrollOverflowHandler.isScrolled(o, n)) return !0;
                    t();
                } else t();
            }
        }
        function ve(n) {
            var o = n.originalEvent;
            if (!ge(n.target) && me(o)) {
                s.autoScrolling && n.preventDefault();
                var i = e(C),
                    l = s.scrollOverflowHandler.scrollable(i);
                if (Qn && !Wn) {
                    var r = An(o);
                    (so = r.y),
                        (co = r.x),
                        i.find(W).length && t.abs(ao - co) > t.abs(ro - so)
                            ? t.abs(ao - co) > (ie.outerWidth() / 100) * s.touchSensitivity && (ao > co ? Jn.m.right && In.moveSlideRight() : Jn.m.left && In.moveSlideLeft())
                            : s.autoScrolling && t.abs(ro - so) > (ie.height() / 100) * s.touchSensitivity && (ro > so ? pe("down", l) : so > ro && pe("up", l));
                }
            }
        }
        function ge(n, o) {
            o = o || 0;
            var t = e(n).parent();
            return o < s.normalScrollElementTouchThreshold && t.is(s.normalScrollElements) ? !0 : o == s.normalScrollElementTouchThreshold ? !1 : ge(t, ++o);
        }
        function me(e) {
            return "undefined" == typeof e.pointerType || "mouse" != e.pointerType;
        }
        function Se(e) {
            var n = e.originalEvent;
            if ((s.fitToSection && Dn.stop(), me(n))) {
                var o = An(n);
                (ro = o.y), (ao = o.x);
            }
        }
        function we(e, n) {
            for (var o = 0, i = e.slice(t.max(e.length - n, 1)), l = 0; l < i.length; l++) o += i[l];
            return t.ceil(o / n);
        }
        function ye(o) {
            var i = new Date().getTime(),
                l = e(y).hasClass(M);
            if (s.autoScrolling && !qn && !l) {
                o = o || n.event;
                var r = o.wheelDelta || -o.deltaY || -o.detail,
                    a = t.max(-1, t.min(1, r)),
                    c = "undefined" != typeof o.wheelDeltaX || "undefined" != typeof o.deltaX,
                    d = t.abs(o.wheelDeltaX) < t.abs(o.wheelDelta) || t.abs(o.deltaX) < t.abs(o.deltaY) || !c;
                Gn.length > 149 && Gn.shift(), Gn.push(t.abs(r)), s.scrollBar && (o.preventDefault ? o.preventDefault() : (o.returnValue = !1));
                var f = e(C),
                    u = s.scrollOverflowHandler.scrollable(f),
                    h = i - fo;
                if (((fo = i), h > 200 && (Gn = []), Qn)) {
                    var p = we(Gn, 10),
                        v = we(Gn, 70),
                        g = p >= v;
                    g && d && (0 > a ? pe("down", u) : pe("up", u));
                }
                return !1;
            }
            s.fitToSection && Dn.stop();
        }
        function be(n, o) {
            var t = "undefined" == typeof o ? e(C) : o,
                i = t.find(W),
                l = i.find(F).length;
            if (!(!i.length || Wn || 2 > l)) {
                var r = i.find(V),
                    a = null;
                if (((a = "prev" === n ? r.prev(F) : r.next(F)), !a.length)) {
                    if (!s.loopHorizontal) return;
                    a = "prev" === n ? r.siblings(":last") : r.siblings(":first");
                }
                (Wn = !0), je(i, a);
            }
        }
        function xe() {
            e(V).each(function () {
                Ln(e(this), "internal");
            });
        }
        function Te(e) {
            var n = e.position(),
                o = n.top,
                t = n.top > uo,
                i = o - Nn + e.outerHeight();
            return e.outerHeight() > Nn ? t || (o = i) : (t || (Kn && e.is(":last-child"))) && (o = i), (uo = o), o;
        }
        function Ce(n, o, t) {
            if ("undefined" != typeof n) {
                var i = Te(n),
                    l = {
                        element: n,
                        callback: o,
                        isMovementUp: t,
                        dtop: i,
                        yMovement: on(n),
                        anchorLink: n.data("anchor"),
                        sectionIndex: n.index(T),
                        activeSlide: n.find(V),
                        activeSection: e(C),
                        leavingSection: e(C).index(T) + 1,
                        localIsResizing: Kn,
                    };
                if (!((l.activeSection.is(n) && !Kn) || (s.scrollBar && ie.scrollTop() === l.dtop && !n.hasClass(E)))) {
                    if (l.activeSlide.length)
                        var r = l.activeSlide.data("anchor"),
                            a = l.activeSlide.index();
                    s.autoScrolling && s.continuousVertical && "undefined" != typeof l.isMovementUp && ((!l.isMovementUp && "up" == l.yMovement) || (l.isMovementUp && "down" == l.yMovement)) && (l = Le(l)),
                        (!e.isFunction(s.onLeave) || l.localIsResizing || s.onLeave.call(l.activeSection, l.leavingSection, l.sectionIndex + 1, l.yMovement) !== !1) &&
                            (Re(l.activeSection), n.addClass(m).siblings().removeClass(m), Me(n), (Qn = !1), pn(a, r, l.anchorLink, l.sectionIndex), ke(l), (Fn = l.anchorLink), nn(l.anchorLink, l.sectionIndex));
                }
            }
        }
        function ke(n) {
            if (s.css3 && s.autoScrolling && !s.scrollBar) {
                var o = "translate3d(0px, -" + n.dtop + "px, 0px)";
                sn(o, !0),
                    s.scrollingSpeed
                        ? ($n = setTimeout(function () {
                              Ee(n);
                          }, s.scrollingSpeed))
                        : Ee(n);
            } else {
                var t = Ae(n);
                e(t.element)
                    .animate(t.options, s.scrollingSpeed, s.easing)
                    .promise()
                    .done(function () {
                        s.scrollBar
                            ? setTimeout(function () {
                                  Ee(n);
                              }, 30)
                            : Ee(n);
                    });
            }
        }
        function Ae(e) {
            var n = {};
            return s.autoScrolling && !s.scrollBar ? ((n.options = { top: -e.dtop }), (n.element = a)) : ((n.options = { scrollTop: e.dtop }), (n.element = "html, body")), n;
        }
        function Le(n) {
            return (
                n.isMovementUp ? e(C).before(n.activeSection.nextAll(T)) : e(C).after(n.activeSection.prevAll(T).get().reverse()),
                Bn(e(C).position().top),
                xe(),
                (n.wrapAroundElements = n.activeSection),
                (n.dtop = n.element.position().top),
                (n.yMovement = on(n.element)),
                n
            );
        }
        function Be(n) {
            n.wrapAroundElements && n.wrapAroundElements.length && (n.isMovementUp ? e(k).before(n.wrapAroundElements) : e(A).after(n.wrapAroundElements), Bn(e(C).position().top), xe());
        }
        function Ee(n) {
            Be(n),
                n.element.find(".fp-scrollable").mouseover(),
                e.isFunction(s.afterLoad) && !n.localIsResizing && s.afterLoad.call(n.element, n.anchorLink, n.sectionIndex + 1),
                He(n.element),
                n.element.addClass(w).siblings().removeClass(w),
                (Qn = !0),
                e.isFunction(n.callback) && n.callback.call(this);
        }
        function Me(n) {
            var n = Oe(n);
            n.find("img[data-src], source[data-src], audio[data-src]").each(function () {
                e(this).attr("src", e(this).data("src")), e(this).removeAttr("data-src"), e(this).is("source") && e(this).closest("video").get(0).load();
            });
        }
        function He(n) {
            var n = Oe(n);
            n.find("video, audio").each(function () {
                var n = e(this).get(0);
                n.hasAttribute("autoplay") && "function" == typeof n.play && n.play();
            });
        }
        function Re(n) {
            var n = Oe(n);
            n.find("video, audio").each(function () {
                var n = e(this).get(0);
                n.hasAttribute("data-ignore") || "function" != typeof n.pause || n.pause();
            });
        }
        function Oe(n) {
            var o = n.find(V);
            return o.length && (n = e(o)), n;
        }
        function ze() {
            var e = n.location.hash.replace("#", "").split("/"),
                o = e[0],
                t = e[1];
            o && (s.animateAnchor ? fn(o, t) : In.silentMoveTo(o, t));
        }
        function De() {
            if (!io && !s.lockAnchors) {
                var e = n.location.hash.replace("#", "").split("/"),
                    o = e[0],
                    t = e[1],
                    i = "undefined" == typeof Fn,
                    l = "undefined" == typeof Fn && "undefined" == typeof t && !Wn;
                o.length && ((o && o !== Fn && !i) || l || (!Wn && Vn != t)) && fn(o, t);
            }
        }
        function Pe(n) {
            clearTimeout(oo);
            var o = e(":focus");
            if (!o.is("textarea") && !o.is("input") && !o.is("select") && "true" !== o.attr("contentEditable") && "" !== o.attr("contentEditable") && s.keyboardScrolling && s.autoScrolling) {
                var t = n.which,
                    i = [40, 38, 32, 33, 34];
                e.inArray(t, i) > -1 && n.preventDefault(),
                    (qn = n.ctrlKey),
                    (oo = setTimeout(function () {
                        Ne(n);
                    }, 150));
            }
        }
        function Ie() {
            e(this).prev().trigger("click");
        }
        function Fe(e) {
            jn && (qn = e.ctrlKey);
        }
        function Ve(e) {
            2 == e.which && ((ho = e.pageY), Xn.on("mousemove", Ke));
        }
        function qe(e) {
            2 == e.which && Xn.off("mousemove");
        }
        function We() {
            var n = e(this).closest(T);
            e(this).hasClass(J) ? Jn.m.left && In.moveSlideLeft(n) : Jn.m.right && In.moveSlideRight(n);
        }
        function Ye() {
            (jn = !1), (qn = !1);
        }
        function Ue(n) {
            n.preventDefault();
            var o = e(this).parent().index();
            Ce(e(T).eq(o));
        }
        function Xe(n) {
            n.preventDefault();
            var o = e(this).closest(T).find(W),
                t = o.find(F).eq(e(this).closest("li").index());
            je(o, t);
        }
        function Ne(n) {
            var o = n.shiftKey;
            switch (n.which) {
                case 38:
                case 33:
                    Jn.k.up && In.moveSectionUp();
                    break;
                case 32:
                    if (o && Jn.k.up) {
                        In.moveSectionUp();
                        break;
                    }
                case 40:
                case 34:
                    Jn.k.down && In.moveSectionDown();
                    break;
                case 36:
                    Jn.k.up && In.moveTo(1);
                    break;
                case 35:
                    Jn.k.down && In.moveTo(e(T).length);
                    break;
                case 37:
                    Jn.k.left && In.moveSlideLeft();
                    break;
                case 39:
                    Jn.k.right && In.moveSlideRight();
                    break;
                default:
                    return;
            }
        }
        function Ke(e) {
            Qn && (e.pageY < ho && Jn.m.up ? In.moveSectionUp() : e.pageY > ho && Jn.m.down && In.moveSectionDown()), (ho = e.pageY);
        }
        function je(n, o) {
            var i = o.position(),
                l = o.index(),
                r = n.closest(T),
                a = r.index(T),
                c = r.data("anchor"),
                d = r.find(K),
                f = gn(o),
                u = r.find(V),
                h = Kn;
            if (s.onSlideLeave) {
                var p = u.index(),
                    v = tn(p, l);
                if (!h && "none" !== v && e.isFunction(s.onSlideLeave) && s.onSlideLeave.call(u, c, a + 1, p, v, l) === !1) return void (Wn = !1);
            }
            Re(u), o.addClass(m).siblings().removeClass(m), h || Me(o), !s.loopHorizontal && s.controlArrows && (r.find(_).toggle(0 !== l), r.find(te).toggle(!o.is(":last-child"))), r.hasClass(m) && pn(l, f, c, a);
            var g = function () {
                h || (e.isFunction(s.afterSlideLoad) && s.afterSlideLoad.call(o, c, a + 1, f, l)), He(o), (Wn = !1);
            };
            if (s.css3) {
                var w = "translate3d(-" + t.round(i.left) + "px, 0px, 0px)";
                Je(n.find(U), s.scrollingSpeed > 0).css(En(w)),
                    (_n = setTimeout(
                        function () {
                            g();
                        },
                        s.scrollingSpeed,
                        s.easing
                    ));
            } else
                n.animate({ scrollLeft: t.round(i.left) }, s.scrollingSpeed, s.easing, function () {
                    g();
                });
            d.find(S).removeClass(m), d.find("li").eq(l).find("a").addClass(m);
        }
        function Qe() {
            if ((Ge(), Yn)) {
                var n = e(o.activeElement);
                if (!n.is("textarea") && !n.is("input") && !n.is("select")) {
                    var i = ie.height();
                    t.abs(i - po) > (20 * t.max(po, i)) / 100 && (In.reBuild(!0), (po = i));
                }
            } else
                clearTimeout(Zn),
                    (Zn = setTimeout(function () {
                        In.reBuild(!0);
                    }, 350));
        }
        function Ge() {
            var e = s.responsive || s.responsiveWidth,
                n = s.responsiveHeight,
                o = e && ie.outerWidth() < e,
                t = n && ie.height() < n;
            e && n ? In.setResponsive(o || t) : e ? In.setResponsive(o) : n && In.setResponsive(t);
        }
        function Je(e) {
            var n = "all " + s.scrollingSpeed + "ms " + s.easingcss3;
            return e.removeClass(h), e.css({ "-webkit-transition": n, transition: n });
        }
        function Ze(e) {
            return e.addClass(h);
        }
        function $e(e, n) {
            var o = 825,
                i = 900;
            if (o > e || i > n) {
                var l = (100 * e) / o,
                    r = (100 * n) / i,
                    a = t.min(l, r),
                    s = a.toFixed(2);
                Pn.css("font-size", s + "%");
            } else Pn.css("font-size", "100%");
        }
        function _e(n, o) {
            s.navigation &&
                (e(R).find(S).removeClass(m),
                n
                    ? e(R)
                          .find('a[href="#' + n + '"]')
                          .addClass(m)
                    : e(R).find("li").eq(o).find("a").addClass(m));
        }
        function en(n) {
            s.menu &&
                (e(s.menu).find(S).removeClass(m),
                e(s.menu)
                    .find('[data-menuanchor="' + n + '"]')
                    .addClass(m));
        }
        function nn(e, n) {
            en(e), _e(e, n);
        }
        function on(n) {
            var o = e(C).index(T),
                t = n.index(T);
            return o == t ? "none" : o > t ? "up" : "down";
        }
        function tn(e, n) {
            return e == n ? "none" : e > n ? "left" : "right";
        }
        function ln(e) {
            e.css("overflow", "hidden");
            var n,
                o = s.scrollOverflowHandler,
                t = o.wrapContent(),
                i = e.closest(T),
                l = o.scrollable(e);
            l.length ? (n = o.scrollHeight(e)) : ((n = e.get(0).scrollHeight), s.verticalCentered && (n = e.find(B).get(0).scrollHeight));
            var r = Nn - parseInt(i.css("padding-bottom")) - parseInt(i.css("padding-top"));
            n > r ? (l.length ? o.update(e, r) : (s.verticalCentered ? e.find(B).wrapInner(t) : e.wrapInner(t), o.create(e, r))) : o.remove(e), e.css("overflow", "");
        }
        function rn(e) {
            e.addClass(X).wrapInner('<div class="' + L + '" style="height:' + an(e) + 'px;" />');
        }
        function an(e) {
            var n = Nn;
            if (s.paddingTop || s.paddingBottom) {
                var o = e;
                o.hasClass(x) || (o = e.closest(T));
                var t = parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom"));
                n = Nn - t;
            }
            return n;
        }
        function sn(e, n) {
            n ? Je(Xn) : Ze(Xn),
                Xn.css(En(e)),
                setTimeout(function () {
                    Xn.removeClass(h);
                }, 10);
        }
        function cn(n) {
            var o = Xn.find(T + '[data-anchor="' + n + '"]');
            return o.length || (o = e(T).eq(n - 1)), o;
        }
        function dn(e, n) {
            var o = n.find(W),
                t = o.find(F + '[data-anchor="' + e + '"]');
            return t.length || (t = o.find(F).eq(e)), t;
        }
        function fn(e, n) {
            var o = cn(e);
            "undefined" == typeof n && (n = 0),
                e === Fn || o.hasClass(m)
                    ? un(o, n)
                    : Ce(o, function () {
                          un(o, n);
                      });
        }
        function un(e, n) {
            if ("undefined" != typeof n) {
                var o = e.find(W),
                    t = dn(n, e);
                t.length && je(o, t);
            }
        }
        function hn(e, n) {
            e.append('<div class="' + N + '"><ul></ul></div>');
            var o = e.find(K);
            o.addClass(s.slidesNavPosition);
            for (var t = 0; n > t; t++) o.find("ul").append('<li><a href="#"><span></span></a></li>');
            o.css("margin-left", "-" + o.width() / 2 + "px"), o.find("li").first().find("a").addClass(m);
        }
        function pn(e, n, o, t) {
            var i = "";
            s.anchors.length && !s.lockAnchors && (e ? ("undefined" != typeof o && (i = o), "undefined" == typeof n && (n = e), (Vn = n), vn(i + "/" + n)) : "undefined" != typeof e ? ((Vn = n), vn(o)) : vn(o)), mn();
        }
        function vn(e) {
            if (s.recordHistory) location.hash = e;
            else if (Yn || Un) n.history.replaceState(i, i, "#" + e);
            else {
                var o = n.location.href.split("#")[0];
                n.location.replace(o + "#" + e);
            }
        }
        function gn(e) {
            var n = e.data("anchor"),
                o = e.index();
            return "undefined" == typeof n && (n = o), n;
        }
        function mn() {
            var n = e(C),
                o = n.find(V),
                t = gn(n),
                i = gn(o),
                l = (n.index(T), String(t));
            o.length && (l = l + "-" + i), (l = l.replace("/", "-").replace("#", ""));
            var r = new RegExp("\\b\\s?" + g + "-[^\\s]+\\b", "g");
            (Pn[0].className = Pn[0].className.replace(r, "")), Pn.addClass(g + "-" + l);
        }
        function Sn() {
            var e,
                t = o.createElement("p"),
                l = { webkitTransform: "-webkit-transform", OTransform: "-o-transform", msTransform: "-ms-transform", MozTransform: "-moz-transform", transform: "transform" };
            o.body.insertBefore(t, null);
            for (var r in l) t.style[r] !== i && ((t.style[r] = "translate3d(1px,1px,1px)"), (e = n.getComputedStyle(t).getPropertyValue(l[r])));
            return o.body.removeChild(t), e !== i && e.length > 0 && "none" !== e;
        }
        function wn() {
            o.addEventListener ? (o.removeEventListener("mousewheel", ye, !1), o.removeEventListener("wheel", ye, !1), o.removeEventListener("MozMousePixelScroll", ye, !1)) : o.detachEvent("onmousewheel", ye);
        }
        function yn() {
            var e,
                t = "";
            n.addEventListener ? (e = "addEventListener") : ((e = "attachEvent"), (t = "on"));
            var l = "onwheel" in o.createElement("div") ? "wheel" : o.onmousewheel !== i ? "mousewheel" : "DOMMouseScroll";
            "DOMMouseScroll" == l ? o[e](t + "MozMousePixelScroll", ye, !1) : o[e](t + l, ye, !1);
        }
        function bn() {
            Xn.on("mousedown", Ve).on("mouseup", qe);
        }
        function xn() {
            Xn.off("mousedown", Ve).off("mouseup", qe);
        }
        function Tn() {
            if (Yn || Un) {
                var n = kn();
                e(a)
                    .off("touchstart " + n.down)
                    .on("touchstart " + n.down, Se),
                    e(a)
                        .off("touchmove " + n.move)
                        .on("touchmove " + n.move, ve);
            }
        }
        function Cn() {
            if (Yn || Un) {
                var n = kn();
                e(a).off("touchstart " + n.down), e(a).off("touchmove " + n.move);
            }
        }
        function kn() {
            var e;
            return (e = n.PointerEvent ? { down: "pointerdown", move: "pointermove" } : { down: "MSPointerDown", move: "MSPointerMove" });
        }
        function An(e) {
            var n = [];
            return (
                (n.y = "undefined" != typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY),
                (n.x = "undefined" != typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX),
                Un && me(e) && s.scrollBar && ((n.y = e.touches[0].pageY), (n.x = e.touches[0].pageX)),
                n
            );
        }
        function Ln(e, n) {
            In.setScrollingSpeed(0, "internal"), "undefined" != typeof n && (Kn = !0), je(e.closest(W), e), "undefined" != typeof n && (Kn = !1), In.setScrollingSpeed(to.scrollingSpeed, "internal");
        }
        function Bn(e) {
            if (s.scrollBar) Xn.scrollTop(e);
            else if (s.css3) {
                var n = "translate3d(0px, -" + e + "px, 0px)";
                sn(n, !1);
            } else Xn.css("top", -e);
        }
        function En(e) {
            return { "-webkit-transform": e, "-moz-transform": e, "-ms-transform": e, transform: e };
        }
        function Mn(e, n, o) {
            switch (n) {
                case "up":
                    Jn[o].up = e;
                    break;
                case "down":
                    Jn[o].down = e;
                    break;
                case "left":
                    Jn[o].left = e;
                    break;
                case "right":
                    Jn[o].right = e;
                    break;
                case "all":
                    "m" == o ? In.setAllowScrolling(e) : In.setKeyboardScrolling(e);
            }
        }
        function Hn() {
            Bn(0),
                e(R + ", " + K + ", " + G).remove(),
                e(T).css({ height: "", "background-color": "", padding: "" }),
                e(F).css({ width: "" }),
                Xn.css({ height: "", position: "", "-ms-touch-action": "", "touch-action": "" }),
                Dn.css({ overflow: "", height: "" }),
                e("html").removeClass(v),
                e.each(Pn.get(0).className.split(/\s+/), function (e, n) {
                    0 === n.indexOf(g) && Pn.removeClass(n);
                }),
                e(T + ", " + F).each(function () {
                    s.scrollOverflowHandler.remove(e(this)), e(this).removeClass(X + " " + m);
                }),
                Ze(Xn),
                Xn.find(B + ", " + U + ", " + W).each(function () {
                    e(this).replaceWith(this.childNodes);
                }),
                Dn.scrollTop(0);
            var n = [x, I, Y];
            e.each(n, function (n, o) {
                e("." + o).removeClass(o);
            });
        }
        function Rn(e, n, o) {
            (s[e] = n), "internal" !== o && (to[e] = n);
        }
        function On() {
            return e("html").hasClass(v)
                ? void zn("error", "Fullpage.js can only be initialized once and you are doing it multiple times!")
                : (s.continuousVertical && (s.loopTop || s.loopBottom) && ((s.continuousVertical = !1), zn("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),
                  s.scrollBar && s.scrollOverflow && zn("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"),
                  s.continuousVertical && s.scrollBar && ((s.continuousVertical = !1), zn("warn", "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),
                  void e.each(s.anchors, function (n, o) {
                      var t = le.find("[name]").filter(function () {
                              return e(this).attr("name") && e(this).attr("name").toLowerCase() == o.toLowerCase();
                          }),
                          i = le.find("[id]").filter(function () {
                              return e(this).attr("id") && e(this).attr("id").toLowerCase() == o.toLowerCase();
                          });
                      (i.length || t.length) &&
                          (zn("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."),
                          i.length && zn("error", '"' + o + '" is is being used by another element `id` property'),
                          t.length && zn("error", '"' + o + '" is is being used by another element `name` property'));
                  }));
        }
        function zn(e, n) {
            console && console[e] && console[e]("fullPage: " + n);
        }
        if (e("html").hasClass(v)) return void On();
        var Dn = e("html, body"),
            Pn = e("body"),
            In = e.fn.fullpage;
        (s = e.extend(
            {
                menu: !1,
                anchors: [],
                lockAnchors: !1,
                navigation: !1,
                navigationPosition: "right",
                navigationTooltips: [],
                showActiveTooltip: !1,
                slidesNavigation: !1,
                slidesNavPosition: "bottom",
                scrollBar: !1,
                hybrid: !1,
                css3: !0,
                scrollingSpeed: 700,
                autoScrolling: !0,
                fitToSection: !0,
                fitToSectionDelay: 1e3,
                easing: "easeInOutCubic",
                easingcss3: "ease",
                loopBottom: !1,
                loopTop: !1,
                loopHorizontal: !0,
                continuousVertical: !1,
                normalScrollElements: null,
                scrollOverflow: !1,
                scrollOverflowHandler: l,
                touchSensitivity: 5,
                normalScrollElementTouchThreshold: 5,
                keyboardScrolling: !0,
                animateAnchor: !0,
                recordHistory: !0,
                controlArrows: !0,
                controlArrowColor: "#fff",
                verticalCentered: !0,
                resize: !1,
                sectionsColor: [],
                paddingTop: 0,
                paddingBottom: 0,
                fixedElements: null,
                responsive: 0,
                responsiveWidth: 0,
                responsiveHeight: 0,
                sectionSelector: b,
                slideSelector: P,
                afterLoad: null,
                onLeave: null,
                afterRender: null,
                afterResize: null,
                afterReBuild: null,
                afterSlideLoad: null,
                onSlideLeave: null,
            },
            s
        )),
            On(),
            e.extend(e.easing, {
                easeInOutCubic: function (e, n, o, t, i) {
                    return (n /= i / 2) < 1 ? (t / 2) * n * n * n + o : (t / 2) * ((n -= 2) * n * n + 2) + o;
                },
            }),
            (In.setAutoScrolling = function (n, o) {
                Rn("autoScrolling", n, o);
                var t = e(C);
                s.autoScrolling && !s.scrollBar
                    ? (Dn.css({ overflow: "hidden", height: "100%" }), In.setRecordHistory(to.recordHistory, "internal"), Xn.css({ "-ms-touch-action": "none", "touch-action": "none" }), t.length && Bn(t.position().top))
                    : (Dn.css({ overflow: "visible", height: "initial" }), In.setRecordHistory(!1, "internal"), Xn.css({ "-ms-touch-action": "", "touch-action": "" }), Bn(0), t.length && Dn.scrollTop(t.position().top));
            }),
            (In.setRecordHistory = function (e, n) {
                Rn("recordHistory", e, n);
            }),
            (In.setScrollingSpeed = function (e, n) {
                Rn("scrollingSpeed", e, n);
            }),
            (In.setFitToSection = function (e, n) {
                Rn("fitToSection", e, n);
            }),
            (In.setLockAnchors = function (e) {
                s.lockAnchors = e;
            }),
            (In.setMouseWheelScrolling = function (e) {
                e ? (yn(), bn()) : (wn(), xn());
            }),
            (In.setAllowScrolling = function (n, o) {
                "undefined" != typeof o
                    ? ((o = o.replace(/ /g, "").split(",")),
                      e.each(o, function (e, o) {
                          Mn(n, o, "m");
                      }))
                    : n
                    ? (In.setMouseWheelScrolling(!0), Tn())
                    : (In.setMouseWheelScrolling(!1), Cn());
            }),
            (In.setKeyboardScrolling = function (n, o) {
                "undefined" != typeof o
                    ? ((o = o.replace(/ /g, "").split(",")),
                      e.each(o, function (e, o) {
                          Mn(n, o, "k");
                      }))
                    : (s.keyboardScrolling = n);
            }),
            (In.moveSectionUp = function () {
                var n = e(C).prev(T);
                n.length || (!s.loopTop && !s.continuousVertical) || (n = e(T).last()), n.length && Ce(n, null, !0);
            }),
            (In.moveSectionDown = function () {
                var n = e(C).next(T);
                n.length || (!s.loopBottom && !s.continuousVertical) || (n = e(T).first()), n.length && Ce(n, null, !1);
            }),
            (In.silentMoveTo = function (e, n) {
                In.setScrollingSpeed(0, "internal"), In.moveTo(e, n), In.setScrollingSpeed(to.scrollingSpeed, "internal");
            }),
            (In.moveTo = function (e, n) {
                var o = cn(e);
                "undefined" != typeof n ? fn(e, n) : o.length > 0 && Ce(o);
            }),
            (In.moveSlideRight = function (e) {
                be("next", e);
            }),
            (In.moveSlideLeft = function (e) {
                be("prev", e);
            }),
            (In.reBuild = function (n) {
                if (!Xn.hasClass(p)) {
                    Kn = !0;
                    var o = ie.outerWidth();
                    (Nn = ie.height()),
                        s.resize && $e(Nn, o),
                        e(T).each(function () {
                            var n = e(this).find(W),
                                o = e(this).find(F);
                            s.verticalCentered &&
                                e(this)
                                    .find(B)
                                    .css("height", an(e(this)) + "px"),
                                e(this).css("height", Nn + "px"),
                                s.scrollOverflow &&
                                    (o.length
                                        ? o.each(function () {
                                              ln(e(this));
                                          })
                                        : ln(e(this))),
                                o.length > 1 && je(n, n.find(V));
                        });
                    var t = e(C),
                        i = t.index(T);
                    i && In.silentMoveTo(i + 1), (Kn = !1), e.isFunction(s.afterResize) && n && s.afterResize.call(Xn), e.isFunction(s.afterReBuild) && !n && s.afterReBuild.call(Xn);
                }
            }),
            (In.setResponsive = function (n) {
                var o = Pn.hasClass(u);
                n
                    ? o || (In.setAutoScrolling(!1, "internal"), In.setFitToSection(!1, "internal"), e(R).hide(), Pn.addClass(u))
                    : o && (In.setAutoScrolling(to.autoScrolling, "internal"), In.setFitToSection(to.autoScrolling, "internal"), e(R).show(), Pn.removeClass(u));
            });
        var Fn,
            Vn,
            qn,
            Wn = !1,
            Yn = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
            Un = "ontouchstart" in n || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
            Xn = e(this),
            Nn = ie.height(),
            Kn = !1,
            jn = !0,
            Qn = !0,
            Gn = [],
            Jn = {};
        (Jn.m = { up: !0, down: !0, left: !0, right: !0 }), (Jn.k = e.extend(!0, {}, Jn.m));
        var Zn,
            $n,
            _n,
            eo,
            no,
            oo,
            to = e.extend(!0, {}, s);
        e(this).length && (c(), d());
        var io = !1,
            lo = 0,
            ro = 0,
            ao = 0,
            so = 0,
            co = 0,
            fo = new Date().getTime(),
            uo = 0,
            ho = 0,
            po = Nn;
        In.destroy = function (n) {
            In.setAutoScrolling(!1, "internal"),
                In.setAllowScrolling(!1),
                In.setKeyboardScrolling(!1),
                Xn.addClass(p),
                clearTimeout(_n),
                clearTimeout($n),
                clearTimeout(Zn),
                clearTimeout(eo),
                clearTimeout(no),
                ie.off("scroll", fe).off("hashchange", De).off("resize", Qe),
                le
                    .off("click", R + " a")
                    .off("mouseenter", R + " li")
                    .off("mouseleave", R + " li")
                    .off("click", j)
                    .off("mouseover", s.normalScrollElements)
                    .off("mouseout", s.normalScrollElements),
                e(T).off("click", G),
                clearTimeout(_n),
                clearTimeout($n),
                n && Hn();
        };
    };
    var re = {
        afterRender: function (e) {
            var n = e.find(q),
                o = e.find(c);
            n.length && (o = n.find(V)), o.mouseover();
        },
        create: function (e, n) {
            e.find(c).slimScroll({ allowPageScroll: !0, height: n + "px", size: "10px", alwaysVisible: !0 });
        },
        isScrolled: function (e, n) {
            return "top" === e ? !n.scrollTop() : "bottom" === e ? n.scrollTop() + 1 + n.innerHeight() >= n[0].scrollHeight : void 0;
        },
        scrollable: function (e) {
            return e.find(W).length ? e.find(V).find(c) : e.find(c);
        },
        scrollHeight: function (e) {
            return e.find(c).get(0).scrollHeight;
        },
        remove: function (e) {
            e.find(c).children().first().unwrap().unwrap(), e.find(d).remove(), e.find(f).remove();
        },
        update: function (e, n) {
            e.find(c)
                .css("height", n + "px")
                .parent()
                .css("height", n + "px");
        },
        wrapContent: function () {
            return '<div class="' + s + '"></div>';
        },
    };
    l = re;
});
//# sourceMappingURL=jquery.fullpage.min.js.map
/**BxSlider v4.1.2*/
!(function (t) {
    var e = {},
        s = {
            mode: "horizontal",
            slideSelector: "",
            infiniteLoop: !0,
            hideControlOnEnd: !1,
            speed: 500,
            easing: null,
            slideMargin: 0,
            startSlide: 0,
            randomStart: !1,
            captions: !1,
            ticker: !1,
            tickerHover: !1,
            adaptiveHeight: !1,
            adaptiveHeightSpeed: 500,
            video: !1,
            useCSS: !0,
            preloadImages: "visible",
            responsive: !0,
            slideZIndex: 50,
            touchEnabled: !0,
            swipeThreshold: 50,
            oneToOneTouch: !0,
            preventDefaultSwipeX: !0,
            preventDefaultSwipeY: !1,
            pager: !0,
            pagerType: "full",
            pagerShortSeparator: " / ",
            pagerSelector: null,
            buildPager: null,
            pagerCustom: null,
            controls: !0,
            nextText: "Next",
            prevText: "Prev",
            nextSelector: null,
            prevSelector: null,
            autoControls: !1,
            startText: "Start",
            stopText: "Stop",
            autoControlsCombine: !1,
            autoControlsSelector: null,
            auto: !1,
            pause: 4e3,
            autoStart: !0,
            autoDirection: "next",
            autoHover: !1,
            autoDelay: 0,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 0,
            slideWidth: 0,
            onSliderLoad: function () {},
            onSlideBefore: function () {},
            onSlideAfter: function () {},
            onSlideNext: function () {},
            onSlidePrev: function () {},
            onSliderResize: function () {},
        };
    t.fn.bxSlider = function (n) {
        if (0 == this.length) return this;
        if (this.length > 1)
            return (
                this.each(function () {
                    t(this).bxSlider(n);
                }),
                this
            );
        var o = {},
            r = this;
        e.el = this;
        var a = t(window).width(),
            l = t(window).height(),
            d = function () {
                (o.settings = t.extend({}, s, n)),
                    (o.settings.slideWidth = parseInt(o.settings.slideWidth)),
                    (o.children = r.children(o.settings.slideSelector)),
                    o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length),
                    o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length),
                    o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)),
                    (o.active = { index: o.settings.startSlide }),
                    (o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1),
                    o.carousel && (o.settings.preloadImages = "all"),
                    (o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin),
                    (o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin),
                    (o.working = !1),
                    (o.controls = {}),
                    (o.interval = null),
                    (o.animProp = "vertical" == o.settings.mode ? "top" : "left"),
                    (o.usingCSS =
                        o.settings.useCSS &&
                        "fade" != o.settings.mode &&
                        (function () {
                            var t = document.createElement("div"),
                                e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                            for (var i in e) if (void 0 !== t.style[e[i]]) return (o.cssPrefix = e[i].replace("Perspective", "").toLowerCase()), (o.animProp = "-" + o.cssPrefix + "-transform"), !0;
                            return !1;
                        })()),
                    "vertical" == o.settings.mode && (o.settings.maxSlides = o.settings.minSlides),
                    r.data("origStyle", r.attr("style")),
                    r.children(o.settings.slideSelector).each(function () {
                        t(this).data("origStyle", t(this).attr("style"));
                    }),
                    c();
            },
            c = function () {
                r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),
                    (o.viewport = r.parent()),
                    (o.loader = t('<div class="bx-loading" />')),
                    o.viewport.prepend(o.loader),
                    r.css({ width: "horizontal" == o.settings.mode ? 100 * o.children.length + 215 + "%" : "auto", position: "relative" }),
                    o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"),
                    f(),
                    o.viewport.css({ width: "100%", overflow: "hidden", position: "relative" }),
                    o.viewport.parent().css({ maxWidth: p() }),
                    o.settings.pager || o.viewport.parent().css({ margin: "0 auto 0px" }),
                    o.children.css({ float: "horizontal" == o.settings.mode ? "left" : "none", listStyle: "none", position: "relative" }),
                    o.children.css("width", u()),
                    "horizontal" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin),
                    "vertical" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin),
                    "fade" == o.settings.mode && (o.children.css({ position: "absolute", zIndex: 0, display: "none" }), o.children.eq(o.settings.startSlide).css({ zIndex: o.settings.slideZIndex, display: "block" })),
                    (o.controls.el = t('<div class="bx-controls" />')),
                    o.settings.captions && P(),
                    (o.active.last = o.settings.startSlide == x() - 1),
                    o.settings.video && r.fitVids();
                var e = o.children.eq(o.settings.startSlide);
                "all" == o.settings.preloadImages && (e = o.children),
                    o.settings.ticker
                        ? (o.settings.pager = !1)
                        : (o.settings.pager && T(), o.settings.controls && C(), o.settings.auto && o.settings.autoControls && E(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)),
                    g(e, h);
            },
            g = function (e, i) {
                var s = e.find("img, iframe").length;
                if (0 == s) return i(), void 0;
                var n = 0;
                e.find("img, iframe").each(function () {
                    t(this)
                        .one("load", function () {
                            ++n == s && i();
                        })
                        .each(function () {
                            this.complete && t(this).load();
                        });
                });
            },
            h = function () {
                if (o.settings.infiniteLoop && "fade" != o.settings.mode && !o.settings.ticker) {
                    var e = "vertical" == o.settings.mode ? o.settings.minSlides : o.settings.maxSlides,
                        i = o.children.slice(0, e).clone().addClass("bx-clone"),
                        s = o.children.slice(-e).clone().addClass("bx-clone");
                    r.append(i).prepend(s);
                }
                o.loader.remove(),
                    S(),
                    "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0),
                    o.viewport.height(v()),
                    r.redrawSlider(),
                    o.settings.onSliderLoad(o.active.index),
                    (o.initialized = !0),
                    o.settings.responsive && t(window).bind("resize", Z),
                    o.settings.auto && o.settings.autoStart && H(),
                    o.settings.ticker && L(),
                    o.settings.pager && q(o.settings.startSlide),
                    o.settings.controls && W(),
                    o.settings.touchEnabled && !o.settings.ticker && O();
            },
            v = function () {
                var e = 0,
                    s = t();
                if ("vertical" == o.settings.mode || o.settings.adaptiveHeight)
                    if (o.carousel) {
                        var n = 1 == o.settings.moveSlides ? o.active.index : o.active.index * m();
                        for (s = o.children.eq(n), i = 1; i <= o.settings.maxSlides - 1; i++) s = n + i >= o.children.length ? s.add(o.children.eq(i - 1)) : s.add(o.children.eq(n + i));
                    } else s = o.children.eq(o.active.index);
                else s = o.children;
                return (
                    "vertical" == o.settings.mode
                        ? (s.each(function () {
                              e += t(this).outerHeight();
                          }),
                          o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1)))
                        : (e = Math.max.apply(
                              Math,
                              s
                                  .map(function () {
                                      return t(this).outerHeight(!1);
                                  })
                                  .get()
                          )),
                    e
                );
            },
            p = function () {
                var t = "100%";
                return o.settings.slideWidth > 0 && (t = "horizontal" == o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth), t;
            },
            u = function () {
                var t = o.settings.slideWidth,
                    e = o.viewport.width();
                return (
                    0 == o.settings.slideWidth || (o.settings.slideWidth > e && !o.carousel) || "vertical" == o.settings.mode
                        ? (t = e)
                        : o.settings.maxSlides > 1 && "horizontal" == o.settings.mode && (e > o.maxThreshold || (e < o.minThreshold && (t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides))),
                    t
                );
            },
            f = function () {
                var t = 1;
                if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0)
                    if (o.viewport.width() < o.minThreshold) t = o.settings.minSlides;
                    else if (o.viewport.width() > o.maxThreshold) t = o.settings.maxSlides;
                    else {
                        var e = o.children.first().width();
                        t = Math.floor(o.viewport.width() / e);
                    }
                else "vertical" == o.settings.mode && (t = o.settings.minSlides);
                return t;
            },
            x = function () {
                var t = 0;
                if (o.settings.moveSlides > 0)
                    if (o.settings.infiniteLoop) t = o.children.length / m();
                    else for (var e = 0, i = 0; e < o.children.length; ) ++t, (e = i + f()), (i += o.settings.moveSlides <= f() ? o.settings.moveSlides : f());
                else t = Math.ceil(o.children.length / f());
                return t;
            },
            m = function () {
                return o.settings.moveSlides > 0 && o.settings.moveSlides <= f() ? o.settings.moveSlides : f();
            },
            S = function () {
                if (o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop) {
                    if ("horizontal" == o.settings.mode) {
                        var t = o.children.last(),
                            e = t.position();
                        b(-(e.left - (o.viewport.width() - t.width())), "reset", 0);
                    } else if ("vertical" == o.settings.mode) {
                        var i = o.children.length - o.settings.minSlides,
                            e = o.children.eq(i).position();
                        b(-e.top, "reset", 0);
                    }
                } else {
                    var e = o.children.eq(o.active.index * m()).position();
                    o.active.index == x() - 1 && (o.active.last = !0), void 0 != e && ("horizontal" == o.settings.mode ? b(-e.left, "reset", 0) : "vertical" == o.settings.mode && b(-e.top, "reset", 0));
                }
            },
            b = function (t, e, i, s) {
                if (o.usingCSS) {
                    var n = "vertical" == o.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)";
                    r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"),
                        "slide" == e
                            ? (r.css(o.animProp, n),
                              r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                                  r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), D();
                              }))
                            : "reset" == e
                            ? r.css(o.animProp, n)
                            : "ticker" == e &&
                              (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"),
                              r.css(o.animProp, n),
                              r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                                  r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), b(s.resetValue, "reset", 0), N();
                              }));
                } else {
                    var a = {};
                    (a[o.animProp] = t),
                        "slide" == e
                            ? r.animate(a, i, o.settings.easing, function () {
                                  D();
                              })
                            : "reset" == e
                            ? r.css(o.animProp, t)
                            : "ticker" == e &&
                              r.animate(a, speed, "linear", function () {
                                  b(s.resetValue, "reset", 0), N();
                              });
                }
            },
            w = function () {
                for (var e = "", i = x(), s = 0; i > s; s++) {
                    var n = "";
                    o.settings.buildPager && t.isFunction(o.settings.buildPager) ? ((n = o.settings.buildPager(s)), o.pagerEl.addClass("bx-custom-pager")) : ((n = s + 1), o.pagerEl.addClass("bx-default-pager")),
                        (e += '<div class="bx-pager-item"><a href="" data-slide-index="' + s + '" class="bx-pager-link">' + n + "</a></div>");
                }
                o.pagerEl.html(e);
            },
            T = function () {
                o.settings.pagerCustom
                    ? (o.pagerEl = t(o.settings.pagerCustom))
                    : ((o.pagerEl = t('<div class="bx-pager" />')), o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl), w()),
                    o.pagerEl.on("click", "a", I);
            },
            C = function () {
                (o.controls.next = t('<a class="bx-next" href="">' + o.settings.nextText + "</a>")),
                    (o.controls.prev = t('<a class="bx-prev" href="">' + o.settings.prevText + "</a>")),
                    o.controls.next.bind("click", y),
                    o.controls.prev.bind("click", z),
                    o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next),
                    o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev),
                    o.settings.nextSelector ||
                        o.settings.prevSelector ||
                        ((o.controls.directionEl = t('<div class="bx-controls-direction" />')),
                        o.controls.directionEl.append(o.controls.prev).append(o.controls.next),
                        o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl));
            },
            E = function () {
                (o.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>")),
                    (o.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>")),
                    (o.controls.autoEl = t('<div class="bx-controls-auto" />')),
                    o.controls.autoEl.on("click", ".bx-start", k),
                    o.controls.autoEl.on("click", ".bx-stop", M),
                    o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop),
                    o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),
                    A(o.settings.autoStart ? "stop" : "start");
            },
            P = function () {
                o.children.each(function () {
                    var e = t(this).find("img:first").attr("title");
                    void 0 != e && ("" + e).length && t(this).append('<div class="bx-caption"><span>' + e + "</span></div>");
                });
            },
            y = function (t) {
                o.settings.auto && r.stopAuto(), r.goToNextSlide(), t.preventDefault();
            },
            z = function (t) {
                o.settings.auto && r.stopAuto(), r.goToPrevSlide(), t.preventDefault();
            },
            k = function (t) {
                r.startAuto(), t.preventDefault();
            },
            M = function (t) {
                r.stopAuto(), t.preventDefault();
            },
            I = function (e) {
                o.settings.auto && r.stopAuto();
                var i = t(e.currentTarget),
                    s = parseInt(i.attr("data-slide-index"));
                s != o.active.index && r.goToSlide(s), e.preventDefault();
            },
            q = function (e) {
                var i = o.children.length;
                return "short" == o.settings.pagerType
                    ? (o.settings.maxSlides > 1 && (i = Math.ceil(o.children.length / o.settings.maxSlides)), o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i), void 0)
                    : (o.pagerEl.find("a").removeClass("active"),
                      o.pagerEl.each(function (i, s) {
                          t(s).find("a").eq(e).addClass("active");
                      }),
                      void 0);
            },
            D = function () {
                if (o.settings.infiniteLoop) {
                    var t = "";
                    0 == o.active.index
                        ? (t = o.children.eq(0).position())
                        : o.active.index == x() - 1 && o.carousel
                        ? (t = o.children.eq((x() - 1) * m()).position())
                        : o.active.index == o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()),
                        t && ("horizontal" == o.settings.mode ? b(-t.left, "reset", 0) : "vertical" == o.settings.mode && b(-t.top, "reset", 0));
                }
                (o.working = !1), o.settings.onSlideAfter(o.children.eq(o.active.index), o.oldIndex, o.active.index);
            },
            A = function (t) {
                o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"));
            },
            W = function () {
                1 == x()
                    ? (o.controls.prev.addClass("disabled"), o.controls.next.addClass("disabled"))
                    : !o.settings.infiniteLoop &&
                      o.settings.hideControlOnEnd &&
                      (0 == o.active.index
                          ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled"))
                          : o.active.index == x() - 1
                          ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled"))
                          : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled")));
            },
            H = function () {
                o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : r.startAuto(),
                    o.settings.autoHover &&
                        r.hover(
                            function () {
                                o.interval && (r.stopAuto(!0), (o.autoPaused = !0));
                            },
                            function () {
                                o.autoPaused && (r.startAuto(!0), (o.autoPaused = null));
                            }
                        );
            },
            L = function () {
                var e = 0;
                if ("next" == o.settings.autoDirection) r.append(o.children.clone().addClass("bx-clone"));
                else {
                    r.prepend(o.children.clone().addClass("bx-clone"));
                    var i = o.children.first().position();
                    e = "horizontal" == o.settings.mode ? -i.left : -i.top;
                }
                b(e, "reset", 0),
                    (o.settings.pager = !1),
                    (o.settings.controls = !1),
                    (o.settings.autoControls = !1),
                    o.settings.tickerHover &&
                        !o.usingCSS &&
                        o.viewport.hover(
                            function () {
                                r.stop();
                            },
                            function () {
                                var e = 0;
                                o.children.each(function () {
                                    e += "horizontal" == o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0);
                                });
                                var i = o.settings.speed / e,
                                    s = "horizontal" == o.settings.mode ? "left" : "top",
                                    n = i * (e - Math.abs(parseInt(r.css(s))));
                                N(n);
                            }
                        ),
                    N();
            },
            N = function (t) {
                speed = t ? t : o.settings.speed;
                var e = { left: 0, top: 0 },
                    i = { left: 0, top: 0 };
                "next" == o.settings.autoDirection ? (e = r.find(".bx-clone").first().position()) : (i = o.children.first().position());
                var s = "horizontal" == o.settings.mode ? -e.left : -e.top,
                    n = "horizontal" == o.settings.mode ? -i.left : -i.top,
                    a = { resetValue: n };
                b(s, "ticker", speed, a);
            },
            O = function () {
                (o.touch = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }), o.viewport.bind("touchstart", X);
            },
            X = function (t) {
                if (o.working) t.preventDefault();
                else {
                    o.touch.originalPos = r.position();
                    var e = t.originalEvent;
                    (o.touch.start.x = e.changedTouches[0].pageX), (o.touch.start.y = e.changedTouches[0].pageY), o.viewport.bind("touchmove", Y), o.viewport.bind("touchend", V);
                }
            },
            Y = function (t) {
                var e = t.originalEvent,
                    i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x),
                    s = Math.abs(e.changedTouches[0].pageY - o.touch.start.y);
                if ((3 * i > s && o.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * s > i && o.settings.preventDefaultSwipeY && t.preventDefault(), "fade" != o.settings.mode && o.settings.oneToOneTouch)) {
                    var n = 0;
                    if ("horizontal" == o.settings.mode) {
                        var r = e.changedTouches[0].pageX - o.touch.start.x;
                        n = o.touch.originalPos.left + r;
                    } else {
                        var r = e.changedTouches[0].pageY - o.touch.start.y;
                        n = o.touch.originalPos.top + r;
                    }
                    b(n, "reset", 0);
                }
            },
            V = function (t) {
                o.viewport.unbind("touchmove", Y);
                var e = t.originalEvent,
                    i = 0;
                if (((o.touch.end.x = e.changedTouches[0].pageX), (o.touch.end.y = e.changedTouches[0].pageY), "fade" == o.settings.mode)) {
                    var s = Math.abs(o.touch.start.x - o.touch.end.x);
                    s >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto());
                } else {
                    var s = 0;
                    "horizontal" == o.settings.mode ? ((s = o.touch.end.x - o.touch.start.x), (i = o.touch.originalPos.left)) : ((s = o.touch.end.y - o.touch.start.y), (i = o.touch.originalPos.top)),
                        !o.settings.infiniteLoop && ((0 == o.active.index && s > 0) || (o.active.last && 0 > s))
                            ? b(i, "reset", 200)
                            : Math.abs(s) >= o.settings.swipeThreshold
                            ? (0 > s ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto())
                            : b(i, "reset", 200);
                }
                o.viewport.unbind("touchend", V);
            },
            Z = function () {
                var e = t(window).width(),
                    i = t(window).height();
                (a != e || l != i) && ((a = e), (l = i), r.redrawSlider(), o.settings.onSliderResize.call(r, o.active.index));
            };
        return (
            (r.goToSlide = function (e, i) {
                if (!o.working && o.active.index != e)
                    if (
                        ((o.working = !0),
                        (o.oldIndex = o.active.index),
                        (o.active.index = 0 > e ? x() - 1 : e >= x() ? 0 : e),
                        o.settings.onSlideBefore(o.children.eq(o.active.index), o.oldIndex, o.active.index),
                        "next" == i ? o.settings.onSlideNext(o.children.eq(o.active.index), o.oldIndex, o.active.index) : "prev" == i && o.settings.onSlidePrev(o.children.eq(o.active.index), o.oldIndex, o.active.index),
                        (o.active.last = o.active.index >= x() - 1),
                        o.settings.pager && q(o.active.index),
                        o.settings.controls && W(),
                        "fade" == o.settings.mode)
                    )
                        o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({ height: v() }, o.settings.adaptiveHeightSpeed),
                            o.children.filter(":visible").fadeOut(o.settings.speed).css({ zIndex: 0 }),
                            o.children
                                .eq(o.active.index)
                                .css("zIndex", o.settings.slideZIndex + 1)
                                .fadeIn(o.settings.speed, function () {
                                    t(this).css("zIndex", o.settings.slideZIndex), D();
                                });
                    else {
                        o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({ height: v() }, o.settings.adaptiveHeightSpeed);
                        var s = 0,
                            n = { left: 0, top: 0 };
                        if (!o.settings.infiniteLoop && o.carousel && o.active.last)
                            if ("horizontal" == o.settings.mode) {
                                var a = o.children.eq(o.children.length - 1);
                                (n = a.position()), (s = o.viewport.width() - a.outerWidth());
                            } else {
                                var l = o.children.length - o.settings.minSlides;
                                n = o.children.eq(l).position();
                            }
                        else if (o.carousel && o.active.last && "prev" == i) {
                            var d = 1 == o.settings.moveSlides ? o.settings.maxSlides - m() : (x() - 1) * m() - (o.children.length - o.settings.maxSlides),
                                a = r.children(".bx-clone").eq(d);
                            n = a.position();
                        } else if ("next" == i && 0 == o.active.index) (n = r.find("> .bx-clone").eq(o.settings.maxSlides).position()), (o.active.last = !1);
                        else if (e >= 0) {
                            var c = e * m();
                            n = o.children.eq(c).position();
                        }
                        if ("undefined" != typeof n) {
                            var g = "horizontal" == o.settings.mode ? -(n.left - s) : -n.top;
                            b(g, "slide", o.settings.speed);
                        }
                    }
            }),
            (r.goToNextSlide = function () {
                if (o.settings.infiniteLoop || !o.active.last) {
                    var t = parseInt(o.active.index) + 1;
                    r.goToSlide(t, "next");
                }
            }),
            (r.goToPrevSlide = function () {
                if (o.settings.infiniteLoop || 0 != o.active.index) {
                    var t = parseInt(o.active.index) - 1;
                    r.goToSlide(t, "prev");
                }
            }),
            (r.startAuto = function (t) {
                o.interval ||
                    ((o.interval = setInterval(function () {
                        "next" == o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide();
                    }, o.settings.pause)),
                    o.settings.autoControls && 1 != t && A("stop"));
            }),
            (r.stopAuto = function (t) {
                o.interval && (clearInterval(o.interval), (o.interval = null), o.settings.autoControls && 1 != t && A("start"));
            }),
            (r.getCurrentSlide = function () {
                return o.active.index;
            }),
            (r.getCurrentSlideElement = function () {
                return o.children.eq(o.active.index);
            }),
            (r.getSlideCount = function () {
                return o.children.length;
            }),
            (r.redrawSlider = function () {
                o.children.add(r.find(".bx-clone")).outerWidth(u()),
                    o.viewport.css("height", v()),
                    o.settings.ticker || S(),
                    o.active.last && (o.active.index = x() - 1),
                    o.active.index >= x() && (o.active.last = !0),
                    o.settings.pager && !o.settings.pagerCustom && (w(), q(o.active.index));
            }),
            (r.destroySlider = function () {
                o.initialized &&
                    ((o.initialized = !1),
                    t(".bx-clone", this).remove(),
                    o.children.each(function () {
                        void 0 != t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style");
                    }),
                    void 0 != t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"),
                    t(this).unwrap().unwrap(),
                    o.controls.el && o.controls.el.remove(),
                    o.controls.next && o.controls.next.remove(),
                    o.controls.prev && o.controls.prev.remove(),
                    o.pagerEl && o.settings.controls && o.pagerEl.remove(),
                    t(".bx-caption", this).remove(),
                    o.controls.autoEl && o.controls.autoEl.remove(),
                    clearInterval(o.interval),
                    o.settings.responsive && t(window).unbind("resize", Z));
            }),
            (r.reloadSlider = function (t) {
                void 0 != t && (n = t), r.destroySlider(), d();
            }),
            d(),
            this
        );
    };
})(jQuery);
/*jQuery FlexSlider v2.4.0*/
!(function ($) {
    ($.flexslider = function (e, t) {
        var a = $(e);
        a.vars = $.extend({}, $.flexslider.defaults, t);
        var n = a.vars.namespace,
            i = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            s = ("ontouchstart" in window || i || (window.DocumentTouch && document instanceof DocumentTouch)) && a.vars.touch,
            r = "click touchend MSPointerUp keyup",
            o = "",
            l,
            c = "vertical" === a.vars.direction,
            d = a.vars.reverse,
            u = a.vars.itemWidth > 0,
            v = "fade" === a.vars.animation,
            p = "" !== a.vars.asNavFor,
            m = {},
            f = !0;
        $.data(e, "flexslider", a),
            (m = {
                init: function () {
                    (a.animating = !1),
                        (a.currentSlide = parseInt(a.vars.startAt ? a.vars.startAt : 0, 10)),
                        isNaN(a.currentSlide) && (a.currentSlide = 0),
                        (a.animatingTo = a.currentSlide),
                        (a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last),
                        (a.containerSelector = a.vars.selector.substr(0, a.vars.selector.search(" "))),
                        (a.slides = $(a.vars.selector, a)),
                        (a.container = $(a.containerSelector, a)),
                        (a.count = a.slides.length),
                        (a.syncExists = $(a.vars.sync).length > 0),
                        "slide" === a.vars.animation && (a.vars.animation = "swing"),
                        (a.prop = c ? "top" : "marginLeft"),
                        (a.args = {}),
                        (a.manualPause = !1),
                        (a.stopped = !1),
                        (a.started = !1),
                        (a.startTimeout = null),
                        (a.transitions =
                            !a.vars.video &&
                            !v &&
                            a.vars.useCSS &&
                            (function () {
                                var e = document.createElement("div"),
                                    t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                                for (var n in t) if (void 0 !== e.style[t[n]]) return (a.pfx = t[n].replace("Perspective", "").toLowerCase()), (a.prop = "-" + a.pfx + "-transform"), !0;
                                return !1;
                            })()),
                        (a.ensureAnimationEnd = ""),
                        "" !== a.vars.controlsContainer && (a.controlsContainer = $(a.vars.controlsContainer).length > 0 && $(a.vars.controlsContainer)),
                        "" !== a.vars.manualControls && (a.manualControls = $(a.vars.manualControls).length > 0 && $(a.vars.manualControls)),
                        a.vars.randomize &&
                            (a.slides.sort(function () {
                                return Math.round(Math.random()) - 0.5;
                            }),
                            a.container.empty().append(a.slides)),
                        a.doMath(),
                        a.setup("init"),
                        a.vars.controlNav && m.controlNav.setup(),
                        a.vars.directionNav && m.directionNav.setup(),
                        a.vars.keyboard &&
                            (1 === $(a.containerSelector).length || a.vars.multipleKeyboard) &&
                            $(document).bind("keyup", function (e) {
                                var t = e.keyCode;
                                if (!a.animating && (39 === t || 37 === t)) {
                                    var n = 39 === t ? a.getTarget("next") : 37 === t ? a.getTarget("prev") : !1;
                                    a.flexAnimate(n, a.vars.pauseOnAction);
                                }
                            }),
                        a.vars.mousewheel &&
                            a.bind("mousewheel", function (e, t, n, i) {
                                e.preventDefault();
                                var s = a.getTarget(0 > t ? "next" : "prev");
                                a.flexAnimate(s, a.vars.pauseOnAction);
                            }),
                        a.vars.pausePlay && m.pausePlay.setup(),
                        a.vars.slideshow && a.vars.pauseInvisible && m.pauseInvisible.init(),
                        a.vars.slideshow &&
                            (a.vars.pauseOnHover &&
                                a.hover(
                                    function () {
                                        a.manualPlay || a.manualPause || a.pause();
                                    },
                                    function () {
                                        a.manualPause || a.manualPlay || a.stopped || a.play();
                                    }
                                ),
                            (a.vars.pauseInvisible && m.pauseInvisible.isHidden()) || (a.vars.initDelay > 0 ? (a.startTimeout = setTimeout(a.play, a.vars.initDelay)) : a.play())),
                        p && m.asNav.setup(),
                        s && a.vars.touch && m.touch(),
                        (!v || (v && a.vars.smoothHeight)) && $(window).bind("resize orientationchange focus", m.resize),
                        a.find("img").attr("draggable", "false"),
                        setTimeout(function () {
                            a.vars.start(a);
                        }, 200);
                },
                asNav: {
                    setup: function () {
                        (a.asNav = !0),
                            (a.animatingTo = Math.floor(a.currentSlide / a.move)),
                            (a.currentItem = a.currentSlide),
                            a.slides
                                .removeClass(n + "active-slide")
                                .eq(a.currentItem)
                                .addClass(n + "active-slide"),
                            i
                                ? ((e._slider = a),
                                  a.slides.each(function () {
                                      var e = this;
                                      (e._gesture = new MSGesture()),
                                          (e._gesture.target = e),
                                          e.addEventListener(
                                              "MSPointerDown",
                                              function (e) {
                                                  e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId);
                                              },
                                              !1
                                          ),
                                          e.addEventListener("MSGestureTap", function (e) {
                                              e.preventDefault();
                                              var t = $(this),
                                                  n = t.index();
                                              $(a.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || ((a.direction = a.currentItem < n ? "next" : "prev"), a.flexAnimate(n, a.vars.pauseOnAction, !1, !0, !0));
                                          });
                                  }))
                                : a.slides.on(r, function (e) {
                                      e.preventDefault();
                                      var t = $(this),
                                          i = t.index(),
                                          s = t.offset().left - $(a).scrollLeft();
                                      0 >= s && t.hasClass(n + "active-slide")
                                          ? a.flexAnimate(a.getTarget("prev"), !0)
                                          : $(a.vars.asNavFor).data("flexslider").animating || t.hasClass(n + "active-slide") || ((a.direction = a.currentItem < i ? "next" : "prev"), a.flexAnimate(i, a.vars.pauseOnAction, !1, !0, !0));
                                  });
                    },
                },
                controlNav: {
                    setup: function () {
                        a.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging();
                    },
                    setupPaging: function () {
                        var e = "thumbnails" === a.vars.controlNav ? "control-thumbs" : "control-paging",
                            t = 1,
                            i,
                            s;
                        if (((a.controlNavScaffold = $('<ol class="' + n + "control-nav " + n + e + '"></ol>')), a.pagingCount > 1))
                            for (var l = 0; l < a.pagingCount; l++) {
                                if (((s = a.slides.eq(l)), (i = "thumbnails" === a.vars.controlNav ? '<img src="' + s.attr("data-thumb") + '"/>' : "<a>" + t + "</a>"), "thumbnails" === a.vars.controlNav && !0 === a.vars.thumbCaptions)) {
                                    var c = s.attr("data-thumbcaption");
                                    "" != c && void 0 != c && (i += '<span class="' + n + 'caption">' + c + "</span>");
                                }
                                a.controlNavScaffold.append("<li>" + i + "</li>"), t++;
                            }
                        a.controlsContainer ? $(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold),
                            m.controlNav.set(),
                            m.controlNav.active(),
                            a.controlNavScaffold.delegate("a, img", r, function (e) {
                                if ((e.preventDefault(), "" === o || o === e.type)) {
                                    var t = $(this),
                                        i = a.controlNav.index(t);
                                    t.hasClass(n + "active") || ((a.direction = i > a.currentSlide ? "next" : "prev"), a.flexAnimate(i, a.vars.pauseOnAction));
                                }
                                "" === o && (o = e.type), m.setToClearWatchedEvent();
                            });
                    },
                    setupManual: function () {
                        (a.controlNav = a.manualControls),
                            m.controlNav.active(),
                            a.controlNav.bind(r, function (e) {
                                if ((e.preventDefault(), "" === o || o === e.type)) {
                                    var t = $(this),
                                        i = a.controlNav.index(t);
                                    t.hasClass(n + "active") || ((a.direction = i > a.currentSlide ? "next" : "prev"), a.flexAnimate(i, a.vars.pauseOnAction));
                                }
                                "" === o && (o = e.type), m.setToClearWatchedEvent();
                            });
                    },
                    set: function () {
                        var e = "thumbnails" === a.vars.controlNav ? "img" : "a";
                        a.controlNav = $("." + n + "control-nav li " + e, a.controlsContainer ? a.controlsContainer : a);
                    },
                    active: function () {
                        a.controlNav
                            .removeClass(n + "active")
                            .eq(a.animatingTo)
                            .addClass(n + "active");
                    },
                    update: function (e, t) {
                        a.pagingCount > 1 && "add" === e ? a.controlNavScaffold.append($("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(t).closest("li").remove(),
                            m.controlNav.set(),
                            a.pagingCount > 1 && a.pagingCount !== a.controlNav.length ? a.update(t, e) : m.controlNav.active();
                    },
                },
                directionNav: {
                    setup: function () {
                        var e = $(
                            '<ul class="' +
                                n +
                                'direction-nav"><li class="' +
                                n +
                                'nav-prev"><a class="' +
                                n +
                                'prev" href="#">' +
                                a.vars.prevText +
                                '</a></li><li class="' +
                                n +
                                'nav-next"><a class="' +
                                n +
                                'next" href="#">' +
                                a.vars.nextText +
                                "</a></li></ul>"
                        );
                        a.controlsContainer ? ($(a.controlsContainer).append(e), (a.directionNav = $("." + n + "direction-nav li a", a.controlsContainer))) : (a.append(e), (a.directionNav = $("." + n + "direction-nav li a", a))),
                            m.directionNav.update(),
                            a.directionNav.bind(r, function (e) {
                                e.preventDefault();
                                var t;
                                ("" === o || o === e.type) && ((t = a.getTarget($(this).hasClass(n + "next") ? "next" : "prev")), a.flexAnimate(t, a.vars.pauseOnAction)), "" === o && (o = e.type), m.setToClearWatchedEvent();
                            });
                    },
                    update: function () {
                        var e = n + "disabled";
                        1 === a.pagingCount
                            ? a.directionNav.addClass(e).attr("tabindex", "-1")
                            : a.vars.animationLoop
                            ? a.directionNav.removeClass(e).removeAttr("tabindex")
                            : 0 === a.animatingTo
                            ? a.directionNav
                                  .removeClass(e)
                                  .filter("." + n + "prev")
                                  .addClass(e)
                                  .attr("tabindex", "-1")
                            : a.animatingTo === a.last
                            ? a.directionNav
                                  .removeClass(e)
                                  .filter("." + n + "next")
                                  .addClass(e)
                                  .attr("tabindex", "-1")
                            : a.directionNav.removeClass(e).removeAttr("tabindex");
                    },
                },
                pausePlay: {
                    setup: function () {
                        var e = $('<div class="' + n + 'pauseplay"><a></a></div>');
                        a.controlsContainer ? (a.controlsContainer.append(e), (a.pausePlay = $("." + n + "pauseplay a", a.controlsContainer))) : (a.append(e), (a.pausePlay = $("." + n + "pauseplay a", a))),
                            m.pausePlay.update(a.vars.slideshow ? n + "pause" : n + "play"),
                            a.pausePlay.bind(r, function (e) {
                                e.preventDefault(),
                                    ("" === o || o === e.type) && ($(this).hasClass(n + "pause") ? ((a.manualPause = !0), (a.manualPlay = !1), a.pause()) : ((a.manualPause = !1), (a.manualPlay = !0), a.play())),
                                    "" === o && (o = e.type),
                                    m.setToClearWatchedEvent();
                            });
                    },
                    update: function (e) {
                        "play" === e
                            ? a.pausePlay
                                  .removeClass(n + "pause")
                                  .addClass(n + "play")
                                  .html(a.vars.playText)
                            : a.pausePlay
                                  .removeClass(n + "play")
                                  .addClass(n + "pause")
                                  .html(a.vars.pauseText);
                    },
                },
                touch: function () {
                    function t(t) {
                        a.animating
                            ? t.preventDefault()
                            : (window.navigator.msPointerEnabled || 1 === t.touches.length) &&
                              (a.pause(),
                              (g = c ? a.h : a.w),
                              (S = Number(new Date())),
                              (x = t.touches[0].pageX),
                              (b = t.touches[0].pageY),
                              (f =
                                  u && d && a.animatingTo === a.last
                                      ? 0
                                      : u && d
                                      ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo
                                      : u && a.currentSlide === a.last
                                      ? a.limit
                                      : u
                                      ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide
                                      : d
                                      ? (a.last - a.currentSlide + a.cloneOffset) * g
                                      : (a.currentSlide + a.cloneOffset) * g),
                              (p = c ? b : x),
                              (m = c ? x : b),
                              e.addEventListener("touchmove", n, !1),
                              e.addEventListener("touchend", s, !1));
                    }
                    function n(e) {
                        (x = e.touches[0].pageX), (b = e.touches[0].pageY), (h = c ? p - b : p - x), (y = c ? Math.abs(h) < Math.abs(x - m) : Math.abs(h) < Math.abs(b - m));
                        var t = 500;
                        (!y || Number(new Date()) - S > t) &&
                            (e.preventDefault(), !v && a.transitions && (a.vars.animationLoop || (h /= (0 === a.currentSlide && 0 > h) || (a.currentSlide === a.last && h > 0) ? Math.abs(h) / g + 2 : 1), a.setProps(f + h, "setTouch")));
                    }
                    function s(t) {
                        if ((e.removeEventListener("touchmove", n, !1), a.animatingTo === a.currentSlide && !y && null !== h)) {
                            var i = d ? -h : h,
                                r = a.getTarget(i > 0 ? "next" : "prev");
                            a.canAdvance(r) && ((Number(new Date()) - S < 550 && Math.abs(i) > 50) || Math.abs(i) > g / 2) ? a.flexAnimate(r, a.vars.pauseOnAction) : v || a.flexAnimate(a.currentSlide, a.vars.pauseOnAction, !0);
                        }
                        e.removeEventListener("touchend", s, !1), (p = null), (m = null), (h = null), (f = null);
                    }
                    function r(t) {
                        t.stopPropagation(),
                            a.animating
                                ? t.preventDefault()
                                : (a.pause(),
                                  e._gesture.addPointer(t.pointerId),
                                  (w = 0),
                                  (g = c ? a.h : a.w),
                                  (S = Number(new Date())),
                                  (f =
                                      u && d && a.animatingTo === a.last
                                          ? 0
                                          : u && d
                                          ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo
                                          : u && a.currentSlide === a.last
                                          ? a.limit
                                          : u
                                          ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide
                                          : d
                                          ? (a.last - a.currentSlide + a.cloneOffset) * g
                                          : (a.currentSlide + a.cloneOffset) * g));
                    }
                    function o(t) {
                        t.stopPropagation();
                        var a = t.target._slider;
                        if (a) {
                            var n = -t.translationX,
                                i = -t.translationY;
                            return (
                                (w += c ? i : n),
                                (h = w),
                                (y = c ? Math.abs(w) < Math.abs(-n) : Math.abs(w) < Math.abs(-i)),
                                t.detail === t.MSGESTURE_FLAG_INERTIA
                                    ? void setImmediate(function () {
                                          e._gesture.stop();
                                      })
                                    : void (
                                          (!y || Number(new Date()) - S > 500) &&
                                          (t.preventDefault(),
                                          !v && a.transitions && (a.vars.animationLoop || (h = w / ((0 === a.currentSlide && 0 > w) || (a.currentSlide === a.last && w > 0) ? Math.abs(w) / g + 2 : 1)), a.setProps(f + h, "setTouch")))
                                      )
                            );
                        }
                    }
                    function l(e) {
                        e.stopPropagation();
                        var t = e.target._slider;
                        if (t) {
                            if (t.animatingTo === t.currentSlide && !y && null !== h) {
                                var a = d ? -h : h,
                                    n = t.getTarget(a > 0 ? "next" : "prev");
                                t.canAdvance(n) && ((Number(new Date()) - S < 550 && Math.abs(a) > 50) || Math.abs(a) > g / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : v || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0);
                            }
                            (p = null), (m = null), (h = null), (f = null), (w = 0);
                        }
                    }
                    var p,
                        m,
                        f,
                        g,
                        h,
                        S,
                        y = !1,
                        x = 0,
                        b = 0,
                        w = 0;
                    i
                        ? ((e.style.msTouchAction = "none"),
                          (e._gesture = new MSGesture()),
                          (e._gesture.target = e),
                          e.addEventListener("MSPointerDown", r, !1),
                          (e._slider = a),
                          e.addEventListener("MSGestureChange", o, !1),
                          e.addEventListener("MSGestureEnd", l, !1))
                        : e.addEventListener("touchstart", t, !1);
                },
                resize: function () {
                    !a.animating &&
                        a.is(":visible") &&
                        (u || a.doMath(),
                        v
                            ? m.smoothHeight()
                            : u
                            ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps())
                            : c
                            ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal"))
                            : (a.vars.smoothHeight && m.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal")));
                },
                smoothHeight: function (e) {
                    if (!c || v) {
                        var t = v ? a : a.viewport;
                        e ? t.animate({ height: a.slides.eq(a.animatingTo).height() }, e) : t.height(a.slides.eq(a.animatingTo).height());
                    }
                },
                sync: function (e) {
                    var t = $(a.vars.sync).data("flexslider"),
                        n = a.animatingTo;
                    switch (e) {
                        case "animate":
                            t.flexAnimate(n, a.vars.pauseOnAction, !1, !0);
                            break;
                        case "play":
                            t.playing || t.asNav || t.play();
                            break;
                        case "pause":
                            t.pause();
                    }
                },
                uniqueID: function (e) {
                    return (
                        e
                            .filter("[id]")
                            .add(e.find("[id]"))
                            .each(function () {
                                var e = $(this);
                                e.attr("id", e.attr("id") + "_clone");
                            }),
                        e
                    );
                },
                pauseInvisible: {
                    visProp: null,
                    init: function () {
                        var e = m.pauseInvisible.getHiddenProp();
                        if (e) {
                            var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                            document.addEventListener(t, function () {
                                m.pauseInvisible.isHidden() ? (a.startTimeout ? clearTimeout(a.startTimeout) : a.pause()) : a.started ? a.play() : a.vars.initDelay > 0 ? setTimeout(a.play, a.vars.initDelay) : a.play();
                            });
                        }
                    },
                    isHidden: function () {
                        var e = m.pauseInvisible.getHiddenProp();
                        return e ? document[e] : !1;
                    },
                    getHiddenProp: function () {
                        var e = ["webkit", "moz", "ms", "o"];
                        if ("hidden" in document) return "hidden";
                        for (var t = 0; t < e.length; t++) if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                        return null;
                    },
                },
                setToClearWatchedEvent: function () {
                    clearTimeout(l),
                        (l = setTimeout(function () {
                            o = "";
                        }, 3e3));
                },
            }),
            (a.flexAnimate = function (e, t, i, r, o) {
                if (
                    (a.vars.animationLoop || e === a.currentSlide || (a.direction = e > a.currentSlide ? "next" : "prev"),
                    p && 1 === a.pagingCount && (a.direction = a.currentItem < e ? "next" : "prev"),
                    !a.animating && (a.canAdvance(e, o) || i) && a.is(":visible"))
                ) {
                    if (p && r) {
                        var l = $(a.vars.asNavFor).data("flexslider");
                        if (
                            ((a.atEnd = 0 === e || e === a.count - 1),
                            l.flexAnimate(e, !0, !1, !0, o),
                            (a.direction = a.currentItem < e ? "next" : "prev"),
                            (l.direction = a.direction),
                            Math.ceil((e + 1) / a.visible) - 1 === a.currentSlide || 0 === e)
                        )
                            return (
                                (a.currentItem = e),
                                a.slides
                                    .removeClass(n + "active-slide")
                                    .eq(e)
                                    .addClass(n + "active-slide"),
                                !1
                            );
                        (a.currentItem = e),
                            a.slides
                                .removeClass(n + "active-slide")
                                .eq(e)
                                .addClass(n + "active-slide"),
                            (e = Math.floor(e / a.visible));
                    }
                    if (
                        ((a.animating = !0),
                        (a.animatingTo = e),
                        t && a.pause(),
                        a.vars.before(a),
                        a.syncExists && !o && m.sync("animate"),
                        a.vars.controlNav && m.controlNav.active(),
                        u ||
                            a.slides
                                .removeClass(n + "active-slide")
                                .eq(e)
                                .addClass(n + "active-slide"),
                        (a.atEnd = 0 === e || e === a.last),
                        a.vars.directionNav && m.directionNav.update(),
                        e === a.last && (a.vars.end(a), a.vars.animationLoop || a.pause()),
                        v)
                    )
                        s
                            ? (a.slides.eq(a.currentSlide).css({ opacity: 0, zIndex: 1 }), a.slides.eq(e).css({ opacity: 1, zIndex: 2 }), a.wrapup(f))
                            : (a.slides.eq(a.currentSlide).css({ zIndex: 1 }).animate({ opacity: 0 }, a.vars.animationSpeed, a.vars.easing),
                              a.slides.eq(e).css({ zIndex: 2 }).animate({ opacity: 1 }, a.vars.animationSpeed, a.vars.easing, a.wrapup));
                    else {
                        var f = c ? a.slides.filter(":first").height() : a.computedW,
                            g,
                            h,
                            S;
                        u
                            ? ((g = a.vars.itemMargin), (S = (a.itemW + g) * a.move * a.animatingTo), (h = S > a.limit && 1 !== a.visible ? a.limit : S))
                            : (h =
                                  0 === a.currentSlide && e === a.count - 1 && a.vars.animationLoop && "next" !== a.direction
                                      ? d
                                          ? (a.count + a.cloneOffset) * f
                                          : 0
                                      : a.currentSlide === a.last && 0 === e && a.vars.animationLoop && "prev" !== a.direction
                                      ? d
                                          ? 0
                                          : (a.count + 1) * f
                                      : d
                                      ? (a.count - 1 - e + a.cloneOffset) * f
                                      : (e + a.cloneOffset) * f),
                            a.setProps(h, "", a.vars.animationSpeed),
                            a.transitions
                                ? ((a.vars.animationLoop && a.atEnd) || ((a.animating = !1), (a.currentSlide = a.animatingTo)),
                                  a.container.unbind("webkitTransitionEnd transitionend"),
                                  a.container.bind("webkitTransitionEnd transitionend", function () {
                                      clearTimeout(a.ensureAnimationEnd), a.wrapup(f);
                                  }),
                                  clearTimeout(a.ensureAnimationEnd),
                                  (a.ensureAnimationEnd = setTimeout(function () {
                                      a.wrapup(f);
                                  }, a.vars.animationSpeed + 100)))
                                : a.container.animate(a.args, a.vars.animationSpeed, a.vars.easing, function () {
                                      a.wrapup(f);
                                  });
                    }
                    a.vars.smoothHeight && m.smoothHeight(a.vars.animationSpeed);
                }
            }),
            (a.wrapup = function (e) {
                v || u || (0 === a.currentSlide && a.animatingTo === a.last && a.vars.animationLoop ? a.setProps(e, "jumpEnd") : a.currentSlide === a.last && 0 === a.animatingTo && a.vars.animationLoop && a.setProps(e, "jumpStart")),
                    (a.animating = !1),
                    (a.currentSlide = a.animatingTo),
                    a.vars.after(a);
            }),
            (a.animateSlides = function () {
                !a.animating && f && a.flexAnimate(a.getTarget("next"));
            }),
            (a.pause = function () {
                clearInterval(a.animatedSlides), (a.animatedSlides = null), (a.playing = !1), a.vars.pausePlay && m.pausePlay.update("play"), a.syncExists && m.sync("pause");
            }),
            (a.play = function () {
                a.playing && clearInterval(a.animatedSlides),
                    (a.animatedSlides = a.animatedSlides || setInterval(a.animateSlides, a.vars.slideshowSpeed)),
                    (a.started = a.playing = !0),
                    a.vars.pausePlay && m.pausePlay.update("pause"),
                    a.syncExists && m.sync("play");
            }),
            (a.stop = function () {
                a.pause(), (a.stopped = !0);
            }),
            (a.canAdvance = function (e, t) {
                var n = p ? a.pagingCount - 1 : a.last;
                return t
                    ? !0
                    : p && a.currentItem === a.count - 1 && 0 === e && "prev" === a.direction
                    ? !0
                    : p && 0 === a.currentItem && e === a.pagingCount - 1 && "next" !== a.direction
                    ? !1
                    : e !== a.currentSlide || p
                    ? a.vars.animationLoop
                        ? !0
                        : a.atEnd && 0 === a.currentSlide && e === n && "next" !== a.direction
                        ? !1
                        : a.atEnd && a.currentSlide === n && 0 === e && "next" === a.direction
                        ? !1
                        : !0
                    : !1;
            }),
            (a.getTarget = function (e) {
                return (a.direction = e), "next" === e ? (a.currentSlide === a.last ? 0 : a.currentSlide + 1) : 0 === a.currentSlide ? a.last : a.currentSlide - 1;
            }),
            (a.setProps = function (e, t, n) {
                var i = (function () {
                    var n = e ? e : (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo,
                        i = (function () {
                            if (u) return "setTouch" === t ? e : d && a.animatingTo === a.last ? 0 : d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit : n;
                            switch (t) {
                                case "setTotal":
                                    return d ? (a.count - 1 - a.currentSlide + a.cloneOffset) * e : (a.currentSlide + a.cloneOffset) * e;
                                case "setTouch":
                                    return d ? e : e;
                                case "jumpEnd":
                                    return d ? e : a.count * e;
                                case "jumpStart":
                                    return d ? a.count * e : e;
                                default:
                                    return e;
                            }
                        })();
                    return -1 * i + "px";
                })();
                a.transitions &&
                    ((i = c ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)"), (n = void 0 !== n ? n / 1e3 + "s" : "0s"), a.container.css("-" + a.pfx + "-transition-duration", n), a.container.css("transition-duration", n)),
                    (a.args[a.prop] = i),
                    (a.transitions || void 0 === n) && a.container.css(a.args),
                    a.container.css("transform", i);
            }),
            (a.setup = function (e) {
                if (v)
                    a.slides.css({ width: "100%", float: "left", marginRight: "-100%", position: "relative" }),
                        "init" === e &&
                            (s
                                ? a.slides
                                      .css({ opacity: 0, display: "block", webkitTransition: "opacity " + a.vars.animationSpeed / 1e3 + "s ease", zIndex: 1 })
                                      .eq(a.currentSlide)
                                      .css({ opacity: 1, zIndex: 2 })
                                : 0 == a.vars.fadeFirstSlide
                                ? a.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(a.currentSlide).css({ zIndex: 2 }).css({ opacity: 1 })
                                : a.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(a.currentSlide).css({ zIndex: 2 }).animate({ opacity: 1 }, a.vars.animationSpeed, a.vars.easing)),
                        a.vars.smoothHeight && m.smoothHeight();
                else {
                    var t, i;
                    "init" === e &&
                        ((a.viewport = $('<div class="' + n + 'viewport"></div>')
                            .css({ overflow: "hidden", position: "relative" })
                            .appendTo(a)
                            .append(a.container)),
                        (a.cloneCount = 0),
                        (a.cloneOffset = 0),
                        d && ((i = $.makeArray(a.slides).reverse()), (a.slides = $(i)), a.container.empty().append(a.slides))),
                        a.vars.animationLoop &&
                            !u &&
                            ((a.cloneCount = 2),
                            (a.cloneOffset = 1),
                            "init" !== e && a.container.find(".clone").remove(),
                            a.container.append(m.uniqueID(a.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(a.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))),
                        (a.newSlides = $(a.vars.selector, a)),
                        (t = d ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset),
                        c && !u
                            ? (a.container
                                  .height(200 * (a.count + a.cloneCount) + "%")
                                  .css("position", "absolute")
                                  .width("100%"),
                              setTimeout(
                                  function () {
                                      a.newSlides.css({ display: "block" }), a.doMath(), a.viewport.height(a.h), a.setProps(t * a.h, "init");
                                  },
                                  "init" === e ? 100 : 0
                              ))
                            : (a.container.width(200 * (a.count + a.cloneCount) + "%"),
                              a.setProps(t * a.computedW, "init"),
                              setTimeout(
                                  function () {
                                      a.doMath(), a.newSlides.css({ width: a.computedW, float: "left", display: "block" }), a.vars.smoothHeight && m.smoothHeight();
                                  },
                                  "init" === e ? 100 : 0
                              ));
                }
                u ||
                    a.slides
                        .removeClass(n + "active-slide")
                        .eq(a.currentSlide)
                        .addClass(n + "active-slide"),
                    a.vars.init(a);
            }),
            (a.doMath = function () {
                var e = a.slides.first(),
                    t = a.vars.itemMargin,
                    n = a.vars.minItems,
                    i = a.vars.maxItems;
                (a.w = void 0 === a.viewport ? a.width() : a.viewport.width()),
                    (a.h = e.height()),
                    (a.boxPadding = e.outerWidth() - e.width()),
                    u
                        ? ((a.itemT = a.vars.itemWidth + t),
                          (a.minW = n ? n * a.itemT : a.w),
                          (a.maxW = i ? i * a.itemT - t : a.w),
                          (a.itemW = a.minW > a.w ? (a.w - t * (n - 1)) / n : a.maxW < a.w ? (a.w - t * (i - 1)) / i : a.vars.itemWidth > a.w ? a.w : a.vars.itemWidth),
                          (a.visible = Math.floor(a.w / a.itemW)),
                          (a.move = a.vars.move > 0 && a.vars.move < a.visible ? a.vars.move : a.visible),
                          (a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1)),
                          (a.last = a.pagingCount - 1),
                          (a.limit = 1 === a.pagingCount ? 0 : a.vars.itemWidth > a.w ? a.itemW * (a.count - 1) + t * (a.count - 1) : (a.itemW + t) * a.count - a.w - t))
                        : ((a.itemW = a.w), (a.pagingCount = a.count), (a.last = a.count - 1)),
                    (a.computedW = a.itemW - a.boxPadding);
            }),
            (a.update = function (e, t) {
                a.doMath(),
                    u || (e < a.currentSlide ? (a.currentSlide += 1) : e <= a.currentSlide && 0 !== e && (a.currentSlide -= 1), (a.animatingTo = a.currentSlide)),
                    a.vars.controlNav &&
                        !a.manualControls &&
                        (("add" === t && !u) || a.pagingCount > a.controlNav.length
                            ? m.controlNav.update("add")
                            : (("remove" === t && !u) || a.pagingCount < a.controlNav.length) && (u && a.currentSlide > a.last && ((a.currentSlide -= 1), (a.animatingTo -= 1)), m.controlNav.update("remove", a.last))),
                    a.vars.directionNav && m.directionNav.update();
            }),
            (a.addSlide = function (e, t) {
                var n = $(e);
                (a.count += 1),
                    (a.last = a.count - 1),
                    c && d ? (void 0 !== t ? a.slides.eq(a.count - t).after(n) : a.container.prepend(n)) : void 0 !== t ? a.slides.eq(t).before(n) : a.container.append(n),
                    a.update(t, "add"),
                    (a.slides = $(a.vars.selector + ":not(.clone)", a)),
                    a.setup(),
                    a.vars.added(a);
            }),
            (a.removeSlide = function (e) {
                var t = isNaN(e) ? a.slides.index($(e)) : e;
                (a.count -= 1),
                    (a.last = a.count - 1),
                    isNaN(e) ? $(e, a.slides).remove() : c && d ? a.slides.eq(a.last).remove() : a.slides.eq(e).remove(),
                    a.doMath(),
                    a.update(t, "remove"),
                    (a.slides = $(a.vars.selector + ":not(.clone)", a)),
                    a.setup(),
                    a.vars.removed(a);
            }),
            m.init();
    }),
        $(window)
            .blur(function (e) {
                focused = !1;
            })
            .focus(function (e) {
                focused = !0;
            }),
        ($.flexslider.defaults = {
            namespace: "flex-",
            selector: ".slides > li",
            animation: "fade",
            easing: "swing",
            direction: "horizontal",
            reverse: !1,
            animationLoop: !0,
            smoothHeight: !1,
            startAt: 0,
            slideshow: !0,
            slideshowSpeed: 7e3,
            animationSpeed: 600,
            initDelay: 0,
            randomize: !1,
            fadeFirstSlide: !0,
            thumbCaptions: !1,
            pauseOnAction: !0,
            pauseOnHover: !1,
            pauseInvisible: !0,
            useCSS: !0,
            touch: !0,
            video: !1,
            controlNav: !0,
            directionNav: !0,
            prevText: "Previous",
            nextText: "Next",
            keyboard: !0,
            multipleKeyboard: !1,
            mousewheel: !1,
            pausePlay: !1,
            pauseText: "Pause",
            playText: "Play",
            controlsContainer: "",
            manualControls: "",
            sync: "",
            asNavFor: "",
            itemWidth: 0,
            itemMargin: 0,
            minItems: 1,
            maxItems: 0,
            move: 0,
            allowOneSlide: !0,
            start: function () {},
            before: function () {},
            after: function () {},
            end: function () {},
            added: function () {},
            removed: function () {},
            init: function () {},
        }),
        ($.fn.flexslider = function (e) {
            if ((void 0 === e && (e = {}), "object" == typeof e))
                return this.each(function () {
                    var t = $(this),
                        a = e.selector ? e.selector : ".slides > li",
                        n = t.find(a);
                    (1 === n.length && e.allowOneSlide === !0) || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e);
                });
            var t = $(this).data("flexslider");
            switch (e) {
                case "play":
                    t.play();
                    break;
                case "pause":
                    t.pause();
                    break;
                case "stop":
                    t.stop();
                    break;
                case "next":
                    t.flexAnimate(t.getTarget("next"), !0);
                    break;
                case "prev":
                case "previous":
                    t.flexAnimate(t.getTarget("prev"), !0);
                    break;
                default:
                    "number" == typeof e && t.flexAnimate(e, !0);
            }
        });
})(jQuery);
/*animate*/
(function ($) {
    var selectors = [];
    var check_binded = false;
    var check_lock = false;
    var defaults = { interval: 250, force_process: false };
    var $window = $(window);
    var $prior_appeared;
    function process() {
        check_lock = false;
        for (var index = 0; index < selectors.length; index++) {
            var $appeared = $(selectors[index]).filter(function () {
                return $(this).is(":appeared");
            });
            $appeared.trigger("appear", [$appeared]);
            if ($prior_appeared) {
                var $disappeared = $prior_appeared.not($appeared);
                $disappeared.trigger("disappear", [$disappeared]);
            }
            $prior_appeared = $appeared;
        }
    }
    $.expr[":"]["appeared"] = function (element) {
        var $element = $(element);
        if (!$element.is(":visible")) {
            return false;
        }
        var window_left = $window.scrollLeft();
        var window_top = $window.scrollTop();
        var offset = $element.offset();
        var left = offset.left;
        var top = offset.top;
        if (
            top + $element.height() >= window_top &&
            top - ($element.data("appear-top-offset") || 0) <= window_top + $window.height() &&
            left + $element.width() >= window_left &&
            left - ($element.data("appear-left-offset") || 0) <= window_left + $window.width()
        ) {
            return true;
        } else {
            return false;
        }
    };
    $.fn.extend({
        appear: function (options) {
            var opts = $.extend({}, defaults, options || {});
            var selector = this.selector || this;
            if (!check_binded) {
                var on_check = function () {
                    if (check_lock) {
                        return;
                    }
                    check_lock = true;
                    setTimeout(process, opts.interval);
                };
                $(window).scroll(on_check).resize(on_check);
                check_binded = true;
            }
            if (opts.force_process) {
                setTimeout(process, opts.interval);
            }
            selectors.push(selector);
            return $(selector);
        },
    });
    $.extend({
        force_appear: function () {
            if (check_binded) {
                process();
                return true;
            }
            return false;
        },
    });
})(jQuery);
(function ($) {
    "$:nomunge";
    var cache = {},
        doTimeout = "doTimeout",
        aps = Array.prototype.slice;
    $[doTimeout] = function () {
        return p_doTimeout.apply(window, [0].concat(aps.call(arguments)));
    };
    $.fn[doTimeout] = function () {
        var args = aps.call(arguments),
            result = p_doTimeout.apply(this, [doTimeout + args[0]].concat(args));
        return typeof args[0] === "number" || typeof args[1] === "number" ? this : result;
    };
    function p_doTimeout(jquery_data_key) {
        var that = this,
            elem,
            data = {},
            method_base = jquery_data_key ? $.fn : $,
            args = arguments,
            slice_args = 4,
            id = args[1],
            delay = args[2],
            callback = args[3];
        if (typeof id !== "string") {
            slice_args--;
            id = jquery_data_key = 0;
            delay = args[1];
            callback = args[2];
        }
        if (jquery_data_key) {
            elem = that.eq(0);
            elem.data(jquery_data_key, (data = elem.data(jquery_data_key) || {}));
        } else if (id) {
            data = cache[id] || (cache[id] = {});
        }
        data.id && clearTimeout(data.id);
        delete data.id;
        function cleanup() {
            if (jquery_data_key) {
                elem.removeData(jquery_data_key);
            } else if (id) {
                delete cache[id];
            }
        }
        function actually_setTimeout() {
            data.id = setTimeout(function () {
                data.fn();
            }, delay);
        }
        if (callback) {
            data.fn = function (no_polling_loop) {
                if (typeof callback === "string") {
                    callback = method_base[callback];
                }
                callback.apply(that, aps.call(args, slice_args)) === true && !no_polling_loop ? actually_setTimeout() : cleanup();
            };
            actually_setTimeout();
        } else if (data.fn) {
            delay === undefined ? cleanup() : data.fn(delay === false);
            return true;
        } else {
            cleanup();
        }
    }
})(jQuery);
$(".animatedParent").appear();
$(".animatedClick").click(function () {
    var target = $(this).attr("data-target");
    if ($(this).attr("data-sequence") != undefined) {
        var firstId = $("." + target + ":first").attr("data-id");
        var lastId = $("." + target + ":last").attr("data-id");
        var number = firstId;
        if ($("." + target + "[data-id=" + number + "]").hasClass("go")) {
            $("." + target + "[data-id=" + number + "]").addClass("goAway");
            $("." + target + "[data-id=" + number + "]").removeClass("go");
        } else {
            $("." + target + "[data-id=" + number + "]").addClass("go");
            $("." + target + "[data-id=" + number + "]").removeClass("goAway");
        }
        number++;
        delay = Number($(this).attr("data-sequence"));
        $.doTimeout(delay, function () {
            console.log(lastId);
            if ($("." + target + "[data-id=" + number + "]").hasClass("go")) {
                $("." + target + "[data-id=" + number + "]").addClass("goAway");
                $("." + target + "[data-id=" + number + "]").removeClass("go");
            } else {
                $("." + target + "[data-id=" + number + "]").addClass("go");
                $("." + target + "[data-id=" + number + "]").removeClass("goAway");
            }
            ++number;
            if (number <= lastId) {
                return true;
            }
        });
    } else {
        if ($("." + target).hasClass("go")) {
            $("." + target).addClass("goAway");
            $("." + target).removeClass("go");
        } else {
            $("." + target).addClass("go");
            $("." + target).removeClass("goAway");
        }
    }
});
$(document.body).on("appear", ".animatedParent", function (e, $affected) {
    var ele = $(this).find(".animated");
    var parent = $(this);
    if (parent.attr("data-sequence") != undefined) {
        var firstId = $(this).find(".animated:first").attr("data-id");
        var number = firstId;
        var lastId = $(this).find(".animated:last").attr("data-id");
        $(parent)
            .find(".animated[data-id=" + number + "]")
            .addClass("go");
        number++;
        delay = Number(parent.attr("data-sequence"));
        $.doTimeout(delay, function () {
            $(parent)
                .find(".animated[data-id=" + number + "]")
                .addClass("go");
            ++number;
            if (number <= lastId) {
                return true;
            }
        });
    } else {
        ele.addClass("go");
    }
});
$(document.body).on("disappear", ".animatedParent", function (e, $affected) {
    if (!$(this).hasClass("animateOnce")) {
        $(this).find(".animated").removeClass("go");
    }
});
$(window).load(function () {
    $.force_appear();
});
/*! mousewheel*/
!(function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? (module.exports = a) : a(jQuery);
})(function (a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (
            ((b = a.event.fix(g)),
            (b.type = "mousewheel"),
            "detail" in g && (m = -1 * g.detail),
            "wheelDelta" in g && (m = g.wheelDelta),
            "wheelDeltaY" in g && (m = g.wheelDeltaY),
            "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
            "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
            (j = 0 === m ? l : m),
            "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
            "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
            0 !== m || 0 !== l)
        ) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                (j *= q), (m *= q), (l *= q);
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                (j *= r), (m *= r), (l *= r);
            }
            if (
                ((n = Math.max(Math.abs(m), Math.abs(l))),
                (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
                d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
                (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
                (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
                (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
                k.settings.normalizeOffset && this.getBoundingClientRect)
            ) {
                var s = this.getBoundingClientRect();
                (o = b.clientX - s.left), (p = b.clientY - s.top);
            }
            return (
                (b.deltaX = l),
                (b.deltaY = m),
                (b.deltaFactor = f),
                (b.offsetX = o),
                (b.offsetY = p),
                (b.deltaMode = 0),
                h.unshift(b, j, l, m),
                e && clearTimeout(e),
                (e = setTimeout(c, 200)),
                (a.event.dispatch || a.event.handle).apply(this, h)
            );
        }
    }
    function c() {
        f = null;
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0;
    }
    var e,
        f,
        g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = (a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function () {
            if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
        },
        teardown: function () {
            if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
        },
        getLineHeight: function (b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
        },
        getPageHeight: function (b) {
            return a(b).height();
        },
        settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
    });
    a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a);
        },
    });
});
/*! jScrollPane */
!(function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? (module.exports = a(require("jquery"))) : a(jQuery);
})(function (a) {
    (a.fn.jScrollPane = function (b) {
        function c(b, c) {
            function d(c) {
                var f,
                    h,
                    j,
                    k,
                    l,
                    o,
                    p = !1,
                    q = !1;
                if (((N = c), void 0 === O))
                    (l = b.scrollTop()),
                        (o = b.scrollLeft()),
                        b.css({ overflow: "hidden", padding: 0 }),
                        (P = b.innerWidth() + ra),
                        (Q = b.innerHeight()),
                        b.width(P),
                        (O = a('<div class="jspPane" />').css("padding", qa).append(b.children())),
                        (R = a('<div class="jspContainer" />')
                            .css({ width: P + "px", height: Q + "px" })
                            .append(O)
                            .appendTo(b));
                else {
                    if (
                        (b.css("width", ""),
                        (p = N.stickToBottom && A()),
                        (q = N.stickToRight && B()),
                        (k = b.innerWidth() + ra != P || b.outerHeight() != Q),
                        k && ((P = b.innerWidth() + ra), (Q = b.innerHeight()), R.css({ width: P + "px", height: Q + "px" })),
                        !k && sa == S && O.outerHeight() == T)
                    )
                        return void b.width(P);
                    (sa = S), O.css("width", ""), b.width(P), R.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end();
                }
                O.css("overflow", "auto"),
                    (S = c.contentWidth ? c.contentWidth : O[0].scrollWidth),
                    (T = O[0].scrollHeight),
                    O.css("overflow", ""),
                    (U = S / P),
                    (V = T / Q),
                    (W = V > 1),
                    (X = U > 1),
                    X || W
                        ? (b.addClass("jspScrollable"),
                          (f = N.maintainPosition && ($ || ba)),
                          f && ((h = y()), (j = z())),
                          e(),
                          g(),
                          i(),
                          f && (w(q ? S - P : h, !1), v(p ? T - Q : j, !1)),
                          F(),
                          C(),
                          L(),
                          N.enableKeyboardNavigation && H(),
                          N.clickOnTrack && m(),
                          J(),
                          N.hijackInternalLinks && K())
                        : (b.removeClass("jspScrollable"), O.css({ top: 0, left: 0, width: R.width() - ra }), D(), G(), I(), n()),
                    N.autoReinitialise && !pa
                        ? (pa = setInterval(function () {
                              d(N);
                          }, N.autoReinitialiseDelay))
                        : !N.autoReinitialise && pa && clearInterval(pa),
                    l && b.scrollTop(0) && v(l, !1),
                    o && b.scrollLeft(0) && w(o, !1),
                    b.trigger("jsp-initialised", [X || W]);
            }
            function e() {
                W &&
                    (R.append(
                        a('<div class="jspVerticalBar" />').append(
                            a('<div class="jspCap jspCapTop" />'),
                            a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'), a('<div class="jspDragBottom" />'))),
                            a('<div class="jspCap jspCapBottom" />')
                        )
                    ),
                    (ca = R.find(">.jspVerticalBar")),
                    (da = ca.find(">.jspTrack")),
                    (Y = da.find(">.jspDrag")),
                    N.showArrows &&
                        ((ha = a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", k(0, -1)).bind("click.jsp", E)),
                        (ia = a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", k(0, 1)).bind("click.jsp", E)),
                        N.arrowScrollOnHover && (ha.bind("mouseover.jsp", k(0, -1, ha)), ia.bind("mouseover.jsp", k(0, 1, ia))),
                        j(da, N.verticalArrowPositions, ha, ia)),
                    (fa = Q),
                    R.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function () {
                        fa -= a(this).outerHeight();
                    }),
                    Y.hover(
                        function () {
                            Y.addClass("jspHover");
                        },
                        function () {
                            Y.removeClass("jspHover");
                        }
                    ).bind("mousedown.jsp", function (b) {
                        a("html").bind("dragstart.jsp selectstart.jsp", E), Y.addClass("jspActive");
                        var c = b.pageY - Y.position().top;
                        return (
                            a("html")
                                .bind("mousemove.jsp", function (a) {
                                    p(a.pageY - c, !1);
                                })
                                .bind("mouseup.jsp mouseleave.jsp", o),
                            !1
                        );
                    }),
                    f());
            }
            function f() {
                da.height(fa + "px"), ($ = 0), (ea = N.verticalGutter + da.outerWidth()), O.width(P - ea - ra);
                try {
                    0 === ca.position().left && O.css("margin-left", ea + "px");
                } catch (a) {}
            }
            function g() {
                X &&
                    (R.append(
                        a('<div class="jspHorizontalBar" />').append(
                            a('<div class="jspCap jspCapLeft" />'),
                            a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'), a('<div class="jspDragRight" />'))),
                            a('<div class="jspCap jspCapRight" />')
                        )
                    ),
                    (ja = R.find(">.jspHorizontalBar")),
                    (ka = ja.find(">.jspTrack")),
                    (_ = ka.find(">.jspDrag")),
                    N.showArrows &&
                        ((na = a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", k(-1, 0)).bind("click.jsp", E)),
                        (oa = a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", k(1, 0)).bind("click.jsp", E)),
                        N.arrowScrollOnHover && (na.bind("mouseover.jsp", k(-1, 0, na)), oa.bind("mouseover.jsp", k(1, 0, oa))),
                        j(ka, N.horizontalArrowPositions, na, oa)),
                    _.hover(
                        function () {
                            _.addClass("jspHover");
                        },
                        function () {
                            _.removeClass("jspHover");
                        }
                    ).bind("mousedown.jsp", function (b) {
                        a("html").bind("dragstart.jsp selectstart.jsp", E), _.addClass("jspActive");
                        var c = b.pageX - _.position().left;
                        return (
                            a("html")
                                .bind("mousemove.jsp", function (a) {
                                    r(a.pageX - c, !1);
                                })
                                .bind("mouseup.jsp mouseleave.jsp", o),
                            !1
                        );
                    }),
                    (la = R.innerWidth()),
                    h());
            }
            function h() {
                R.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function () {
                    la -= a(this).outerWidth();
                }),
                    ka.width(la + "px"),
                    (ba = 0);
            }
            function i() {
                if (X && W) {
                    var b = ka.outerHeight(),
                        c = da.outerWidth();
                    (fa -= b),
                        a(ja)
                            .find(">.jspCap:visible,>.jspArrow")
                            .each(function () {
                                la += a(this).outerWidth();
                            }),
                        (la -= c),
                        (Q -= c),
                        (P -= b),
                        ka.parent().append(a('<div class="jspCorner" />').css("width", b + "px")),
                        f(),
                        h();
                }
                X && O.width(R.outerWidth() - ra + "px"),
                    (T = O.outerHeight()),
                    (V = T / Q),
                    X && ((ma = Math.ceil((1 / U) * la)), ma > N.horizontalDragMaxWidth ? (ma = N.horizontalDragMaxWidth) : ma < N.horizontalDragMinWidth && (ma = N.horizontalDragMinWidth), _.width(ma + "px"), (aa = la - ma), s(ba)),
                    W && ((ga = Math.ceil((1 / V) * fa)), ga > N.verticalDragMaxHeight ? (ga = N.verticalDragMaxHeight) : ga < N.verticalDragMinHeight && (ga = N.verticalDragMinHeight), Y.height(ga + "px"), (Z = fa - ga), q($));
            }
            function j(a, b, c, d) {
                var e,
                    f = "before",
                    g = "after";
                "os" == b && (b = /Mac/.test(navigator.platform) ? "after" : "split"), b == f ? (g = b) : b == g && ((f = b), (e = c), (c = d), (d = e)), a[f](c)[g](d);
            }
            function k(a, b, c) {
                return function () {
                    return l(a, b, this, c), this.blur(), !1;
                };
            }
            function l(b, c, d, e) {
                d = a(d).addClass("jspActive");
                var f,
                    g,
                    h = !0,
                    i = function () {
                        0 !== b && ta.scrollByX(b * N.arrowButtonSpeed), 0 !== c && ta.scrollByY(c * N.arrowButtonSpeed), (g = setTimeout(i, h ? N.initialDelay : N.arrowRepeatFreq)), (h = !1);
                    };
                i(),
                    (f = e ? "mouseout.jsp" : "mouseup.jsp"),
                    (e = e || a("html")),
                    e.bind(f, function () {
                        d.removeClass("jspActive"), g && clearTimeout(g), (g = null), e.unbind(f);
                    });
            }
            function m() {
                n(),
                    W &&
                        da.bind("mousedown.jsp", function (b) {
                            if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) {
                                var c,
                                    d = a(this),
                                    e = d.offset(),
                                    f = b.pageY - e.top - $,
                                    g = !0,
                                    h = function () {
                                        var a = d.offset(),
                                            e = b.pageY - a.top - ga / 2,
                                            j = Q * N.scrollPagePercent,
                                            k = (Z * j) / (T - Q);
                                        if (0 > f) $ - k > e ? ta.scrollByY(-j) : p(e);
                                        else {
                                            if (!(f > 0)) return void i();
                                            e > $ + k ? ta.scrollByY(j) : p(e);
                                        }
                                        (c = setTimeout(h, g ? N.initialDelay : N.trackClickRepeatFreq)), (g = !1);
                                    },
                                    i = function () {
                                        c && clearTimeout(c), (c = null), a(document).unbind("mouseup.jsp", i);
                                    };
                                return h(), a(document).bind("mouseup.jsp", i), !1;
                            }
                        }),
                    X &&
                        ka.bind("mousedown.jsp", function (b) {
                            if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) {
                                var c,
                                    d = a(this),
                                    e = d.offset(),
                                    f = b.pageX - e.left - ba,
                                    g = !0,
                                    h = function () {
                                        var a = d.offset(),
                                            e = b.pageX - a.left - ma / 2,
                                            j = P * N.scrollPagePercent,
                                            k = (aa * j) / (S - P);
                                        if (0 > f) ba - k > e ? ta.scrollByX(-j) : r(e);
                                        else {
                                            if (!(f > 0)) return void i();
                                            e > ba + k ? ta.scrollByX(j) : r(e);
                                        }
                                        (c = setTimeout(h, g ? N.initialDelay : N.trackClickRepeatFreq)), (g = !1);
                                    },
                                    i = function () {
                                        c && clearTimeout(c), (c = null), a(document).unbind("mouseup.jsp", i);
                                    };
                                return h(), a(document).bind("mouseup.jsp", i), !1;
                            }
                        });
            }
            function n() {
                ka && ka.unbind("mousedown.jsp"), da && da.unbind("mousedown.jsp");
            }
            function o() {
                a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), Y && Y.removeClass("jspActive"), _ && _.removeClass("jspActive");
            }
            function p(a, b) {
                W && (0 > a ? (a = 0) : a > Z && (a = Z), void 0 === b && (b = N.animateScroll), b ? ta.animate(Y, "top", a, q) : (Y.css("top", a), q(a)));
            }
            function q(a) {
                void 0 === a && (a = Y.position().top), R.scrollTop(0), ($ = a || 0);
                var c = 0 === $,
                    d = $ == Z,
                    e = a / Z,
                    f = -e * (T - Q);
                (ua != c || wa != d) && ((ua = c), (wa = d), b.trigger("jsp-arrow-change", [ua, wa, va, xa])), t(c, d), O.css("top", f), b.trigger("jsp-scroll-y", [-f, c, d]).trigger("scroll");
            }
            function r(a, b) {
                X && (0 > a ? (a = 0) : a > aa && (a = aa), void 0 === b && (b = N.animateScroll), b ? ta.animate(_, "left", a, s) : (_.css("left", a), s(a)));
            }
            function s(a) {
                void 0 === a && (a = _.position().left), R.scrollTop(0), (ba = a || 0);
                var c = 0 === ba,
                    d = ba == aa,
                    e = a / aa,
                    f = -e * (S - P);
                (va != c || xa != d) && ((va = c), (xa = d), b.trigger("jsp-arrow-change", [ua, wa, va, xa])), u(c, d), O.css("left", f), b.trigger("jsp-scroll-x", [-f, c, d]).trigger("scroll");
            }
            function t(a, b) {
                N.showArrows && (ha[a ? "addClass" : "removeClass"]("jspDisabled"), ia[b ? "addClass" : "removeClass"]("jspDisabled"));
            }
            function u(a, b) {
                N.showArrows && (na[a ? "addClass" : "removeClass"]("jspDisabled"), oa[b ? "addClass" : "removeClass"]("jspDisabled"));
            }
            function v(a, b) {
                var c = a / (T - Q);
                p(c * Z, b);
            }
            function w(a, b) {
                var c = a / (S - P);
                r(c * aa, b);
            }
            function x(b, c, d) {
                var e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n = 0,
                    o = 0;
                try {
                    e = a(b);
                } catch (p) {
                    return;
                }
                for (f = e.outerHeight(), g = e.outerWidth(), R.scrollTop(0), R.scrollLeft(0); !e.is(".jspPane"); ) if (((n += e.position().top), (o += e.position().left), (e = e.offsetParent()), /^body|html$/i.test(e[0].nodeName))) return;
                (h = z()),
                    (j = h + Q),
                    h > n || c ? (l = n - N.horizontalGutter) : n + f > j && (l = n - Q + f + N.horizontalGutter),
                    isNaN(l) || v(l, d),
                    (i = y()),
                    (k = i + P),
                    i > o || c ? (m = o - N.horizontalGutter) : o + g > k && (m = o - P + g + N.horizontalGutter),
                    isNaN(m) || w(m, d);
            }
            function y() {
                return -O.position().left;
            }
            function z() {
                return -O.position().top;
            }
            function A() {
                var a = T - Q;
                return a > 20 && a - z() < 10;
            }
            function B() {
                var a = S - P;
                return a > 20 && a - y() < 10;
            }
            function C() {
                R.unbind(za).bind(za, function (a, b, c, d) {
                    ba || (ba = 0), $ || ($ = 0);
                    var e = ba,
                        f = $,
                        g = a.deltaFactor || N.mouseWheelSpeed;
                    return ta.scrollBy(c * g, -d * g, !1), e == ba && f == $;
                });
            }
            function D() {
                R.unbind(za);
            }
            function E() {
                return !1;
            }
            function F() {
                O.find(":input,a")
                    .unbind("focus.jsp")
                    .bind("focus.jsp", function (a) {
                        x(a.target, !1);
                    });
            }
            function G() {
                O.find(":input,a").unbind("focus.jsp");
            }
            function H() {
                function c() {
                    var a = ba,
                        b = $;
                    switch (d) {
                        case 40:
                            ta.scrollByY(N.keyboardSpeed, !1);
                            break;
                        case 38:
                            ta.scrollByY(-N.keyboardSpeed, !1);
                            break;
                        case 34:
                        case 32:
                            ta.scrollByY(Q * N.scrollPagePercent, !1);
                            break;
                        case 33:
                            ta.scrollByY(-Q * N.scrollPagePercent, !1);
                            break;
                        case 39:
                            ta.scrollByX(N.keyboardSpeed, !1);
                            break;
                        case 37:
                            ta.scrollByX(-N.keyboardSpeed, !1);
                    }
                    return (e = a != ba || b != $);
                }
                var d,
                    e,
                    f = [];
                X && f.push(ja[0]),
                    W && f.push(ca[0]),
                    O.bind("focus.jsp", function () {
                        b.focus();
                    }),
                    b
                        .attr("tabindex", 0)
                        .unbind("keydown.jsp keypress.jsp")
                        .bind("keydown.jsp", function (b) {
                            if (b.target === this || (f.length && a(b.target).closest(f).length)) {
                                var g = ba,
                                    h = $;
                                switch (b.keyCode) {
                                    case 40:
                                    case 38:
                                    case 34:
                                    case 32:
                                    case 33:
                                    case 39:
                                    case 37:
                                        (d = b.keyCode), c();
                                        break;
                                    case 35:
                                        v(T - Q), (d = null);
                                        break;
                                    case 36:
                                        v(0), (d = null);
                                }
                                return (e = (b.keyCode == d && g != ba) || h != $), !e;
                            }
                        })
                        .bind("keypress.jsp", function (a) {
                            return a.keyCode == d && c(), !e;
                        }),
                    N.hideFocus ? (b.css("outline", "none"), "hideFocus" in R[0] && b.attr("hideFocus", !0)) : (b.css("outline", ""), "hideFocus" in R[0] && b.attr("hideFocus", !1));
            }
            function I() {
                b.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp"), O.unbind(".jsp");
            }
            function J() {
                if (location.hash && location.hash.length > 1) {
                    var b,
                        c,
                        d = escape(location.hash.substr(1));
                    try {
                        b = a("#" + d + ', a[name="' + d + '"]');
                    } catch (e) {
                        return;
                    }
                    b.length &&
                        O.find(d) &&
                        (0 === R.scrollTop()
                            ? (c = setInterval(function () {
                                  R.scrollTop() > 0 && (x(b, !0), a(document).scrollTop(R.position().top), clearInterval(c));
                              }, 50))
                            : (x(b, !0), a(document).scrollTop(R.position().top)));
                }
            }
            function K() {
                a(document.body).data("jspHijack") ||
                    (a(document.body).data("jspHijack", !0),
                    a(document.body).delegate("a[href*=#]", "click", function (b) {
                        var c,
                            d,
                            e,
                            f,
                            g,
                            h,
                            i = this.href.substr(0, this.href.indexOf("#")),
                            j = location.href;
                        if ((-1 !== location.href.indexOf("#") && (j = location.href.substr(0, location.href.indexOf("#"))), i === j)) {
                            c = escape(this.href.substr(this.href.indexOf("#") + 1));
                            try {
                                d = a("#" + c + ', a[name="' + c + '"]');
                            } catch (k) {
                                return;
                            }
                            d.length &&
                                ((e = d.closest(".jspScrollable")),
                                (f = e.data("jsp")),
                                f.scrollToElement(d, !0),
                                e[0].scrollIntoView && ((g = a(window).scrollTop()), (h = d.offset().top), (g > h || h > g + a(window).height()) && e[0].scrollIntoView()),
                                b.preventDefault());
                        }
                    }));
            }
            function L() {
                var a,
                    b,
                    c,
                    d,
                    e,
                    f = !1;
                R.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick")
                    .bind("touchstart.jsp", function (g) {
                        var h = g.originalEvent.touches[0];
                        (a = y()), (b = z()), (c = h.pageX), (d = h.pageY), (e = !1), (f = !0);
                    })
                    .bind("touchmove.jsp", function (g) {
                        if (f) {
                            var h = g.originalEvent.touches[0],
                                i = ba,
                                j = $;
                            return ta.scrollTo(a + c - h.pageX, b + d - h.pageY), (e = e || Math.abs(c - h.pageX) > 5 || Math.abs(d - h.pageY) > 5), i == ba && j == $;
                        }
                    })
                    .bind("touchend.jsp", function (a) {
                        f = !1;
                    })
                    .bind("click.jsp-touchclick", function (a) {
                        return e ? ((e = !1), !1) : void 0;
                    });
            }
            function M() {
                var a = z(),
                    c = y();
                b.removeClass("jspScrollable").unbind(".jsp"), O.unbind(".jsp"), b.replaceWith(ya.append(O.children())), ya.scrollTop(a), ya.scrollLeft(c), pa && clearInterval(pa);
            }
            var N,
                O,
                P,
                Q,
                R,
                S,
                T,
                U,
                V,
                W,
                X,
                Y,
                Z,
                $,
                _,
                aa,
                ba,
                ca,
                da,
                ea,
                fa,
                ga,
                ha,
                ia,
                ja,
                ka,
                la,
                ma,
                na,
                oa,
                pa,
                qa,
                ra,
                sa,
                ta = this,
                ua = !0,
                va = !0,
                wa = !1,
                xa = !1,
                ya = b.clone(!1, !1).empty(),
                za = a.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
            "border-box" === b.css("box-sizing")
                ? ((qa = 0), (ra = 0))
                : ((qa = b.css("paddingTop") + " " + b.css("paddingRight") + " " + b.css("paddingBottom") + " " + b.css("paddingLeft")), (ra = (parseInt(b.css("paddingLeft"), 10) || 0) + (parseInt(b.css("paddingRight"), 10) || 0))),
                a.extend(ta, {
                    reinitialise: function (b) {
                        (b = a.extend({}, N, b)), d(b);
                    },
                    scrollToElement: function (a, b, c) {
                        x(a, b, c);
                    },
                    scrollTo: function (a, b, c) {
                        w(a, c), v(b, c);
                    },
                    scrollToX: function (a, b) {
                        w(a, b);
                    },
                    scrollToY: function (a, b) {
                        v(a, b);
                    },
                    scrollToPercentX: function (a, b) {
                        w(a * (S - P), b);
                    },
                    scrollToPercentY: function (a, b) {
                        v(a * (T - Q), b);
                    },
                    scrollBy: function (a, b, c) {
                        ta.scrollByX(a, c), ta.scrollByY(b, c);
                    },
                    scrollByX: function (a, b) {
                        var c = y() + Math[0 > a ? "floor" : "ceil"](a),
                            d = c / (S - P);
                        r(d * aa, b);
                    },
                    scrollByY: function (a, b) {
                        var c = z() + Math[0 > a ? "floor" : "ceil"](a),
                            d = c / (T - Q);
                        p(d * Z, b);
                    },
                    positionDragX: function (a, b) {
                        r(a, b);
                    },
                    positionDragY: function (a, b) {
                        p(a, b);
                    },
                    animate: function (a, b, c, d) {
                        var e = {};
                        (e[b] = c), a.animate(e, { duration: N.animateDuration, easing: N.animateEase, queue: !1, step: d });
                    },
                    getContentPositionX: function () {
                        return y();
                    },
                    getContentPositionY: function () {
                        return z();
                    },
                    getContentWidth: function () {
                        return S;
                    },
                    getContentHeight: function () {
                        return T;
                    },
                    getPercentScrolledX: function () {
                        return y() / (S - P);
                    },
                    getPercentScrolledY: function () {
                        return z() / (T - Q);
                    },
                    getIsScrollableH: function () {
                        return X;
                    },
                    getIsScrollableV: function () {
                        return W;
                    },
                    getContentPane: function () {
                        return O;
                    },
                    scrollToBottom: function (a) {
                        p(Z, a);
                    },
                    hijackInternalLinks: a.noop,
                    destroy: function () {
                        M();
                    },
                }),
                d(c);
        }
        return (
            (b = a.extend({}, a.fn.jScrollPane.defaults, b)),
            a.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function () {
                b[this] = b[this] || b.speed;
            }),
            this.each(function () {
                var d = a(this),
                    e = d.data("jsp");
                e ? e.reinitialise(b) : (a("script", d).filter('[type="text/javascript"],:not([type])').remove(), (e = new c(d, b)), d.data("jsp", e));
            })
        );
    }),
        (a.fn.jScrollPane.defaults = {
            showArrows: !1,
            maintainPosition: !0,
            stickToBottom: !1,
            stickToRight: !1,
            clickOnTrack: !0,
            autoReinitialise: !1,
            autoReinitialiseDelay: 500,
            verticalDragMinHeight: 0,
            verticalDragMaxHeight: 99999,
            horizontalDragMinWidth: 0,
            horizontalDragMaxWidth: 99999,
            contentWidth: void 0,
            animateScroll: !1,
            animateDuration: 300,
            animateEase: "linear",
            hijackInternalLinks: !1,
            verticalGutter: 4,
            horizontalGutter: 4,
            mouseWheelSpeed: 3,
            arrowButtonSpeed: 0,
            arrowRepeatFreq: 50,
            arrowScrollOnHover: !1,
            trackClickSpeed: 0,
            trackClickRepeatFreq: 70,
            verticalArrowPositions: "split",
            horizontalArrowPositions: "split",
            enableKeyboardNavigation: !0,
            hideFocus: !1,
            keyboardSpeed: 0,
            initialDelay: 300,
            speed: 30,
            scrollPagePercent: 0.8,
        });
});
/*fancybox*/
(function (window, document, $, undefined) {
    "use strict";
    var H = $("html"),
        W = $(window),
        D = $(document),
        F = ($.fancybox = function () {
            F.open.apply(this, arguments);
        }),
        IE = navigator.userAgent.match(/msie/i),
        didUpdate = null,
        isTouch = document.createTouch !== undefined,
        isQuery = function (obj) {
            return obj && obj.hasOwnProperty && obj instanceof $;
        },
        isString = function (str) {
            return str && $.type(str) === "string";
        },
        isPercentage = function (str) {
            return isString(str) && str.indexOf("%") > 0;
        },
        isScrollable = function (el) {
            return el && !(el.style.overflow && el.style.overflow === "hidden") && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight));
        },
        getScalar = function (orig, dim) {
            var value = parseInt(orig, 10) || 0;
            if (dim && isPercentage(orig)) {
                value = (F.getViewport()[dim] / 100) * value;
            }
            return Math.ceil(value);
        },
        getValue = function (value, dim) {
            return getScalar(value, dim) + "px";
        };
    $.extend(F, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: true,
            autoHeight: false,
            autoWidth: false,
            autoResize: true,
            autoCenter: !isTouch,
            fitToView: true,
            aspectRatio: false,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: true,
            closeBtn: true,
            closeClick: false,
            nextClick: false,
            mouseWheel: true,
            autoPlay: false,
            playSpeed: 3000,
            preload: 3,
            modal: false,
            loop: true,
            ajax: { dataType: "html", headers: { "X-fancyBox": true } },
            iframe: { scrolling: "auto", preload: true },
            swf: { wmode: "transparent", allowfullscreen: "true", allowscriptaccess: "always" },
            keys: { next: { 13: "left", 34: "up", 39: "left", 40: "up" }, prev: { 8: "right", 33: "down", 37: "right", 38: "down" }, close: [27], play: [32], toggle: [70] },
            direction: { next: "left", prev: "right" },
            scrollOutside: true,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe:
                    '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                    (IE ? ' allowtransparency="true"' : "") +
                    "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: true,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: true,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: { overlay: true, title: true },
            onCancel: $.noop,
            beforeLoad: $.noop,
            afterLoad: $.noop,
            beforeShow: $.noop,
            afterShow: $.noop,
            beforeChange: $.noop,
            beforeClose: $.noop,
            afterClose: $.noop,
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: false,
        isOpen: false,
        isOpened: false,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: { timer: null, isActive: false },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (group, opts) {
            if (!group) {
                return;
            }
            if (!$.isPlainObject(opts)) {
                opts = {};
            }
            if (false === F.close(true)) {
                return;
            }
            if (!$.isArray(group)) {
                group = isQuery(group) ? $(group).get() : [group];
            }
            $.each(group, function (i, element) {
                var obj = {},
                    href,
                    title,
                    content,
                    type,
                    rez,
                    hrefParts,
                    selector;
                if ($.type(element) === "object") {
                    if (element.nodeType) {
                        element = $(element);
                    }
                    if (isQuery(element)) {
                        obj = { href: element.data("fancybox-href") || element.attr("href"), title: element.data("fancybox-title") || element.attr("title"), isDom: true, element: element };
                        if ($.metadata) {
                            $.extend(true, obj, element.metadata());
                        }
                    } else {
                        obj = element;
                    }
                }
                href = opts.href || obj.href || (isString(element) ? element : null);
                title = opts.title !== undefined ? opts.title : obj.title || "";
                content = opts.content || obj.content;
                type = content ? "html" : opts.type || obj.type;
                if (!type && obj.isDom) {
                    type = element.data("fancybox-type");
                    if (!type) {
                        rez = element.prop("class").match(/fancybox\.(\w+)/);
                        type = rez ? rez[1] : null;
                    }
                }
                if (isString(href)) {
                    if (!type) {
                        if (F.isImage(href)) {
                            type = "image";
                        } else if (F.isSWF(href)) {
                            type = "swf";
                        } else if (href.charAt(0) === "#") {
                            type = "inline";
                        } else if (isString(element)) {
                            type = "html";
                            content = element;
                        }
                    }
                    if (type === "ajax") {
                        hrefParts = href.split(/\s+/, 2);
                        href = hrefParts.shift();
                        selector = hrefParts.shift();
                    }
                }
                if (!content) {
                    if (type === "inline") {
                        if (href) {
                            content = $(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, "") : href);
                        } else if (obj.isDom) {
                            content = element;
                        }
                    } else if (type === "html") {
                        content = href;
                    } else if (!type && !href && obj.isDom) {
                        type = "inline";
                        content = element;
                    }
                }
                $.extend(obj, { href: href, type: type, content: content, title: title, selector: selector });
                group[i] = obj;
            });
            F.opts = $.extend(true, {}, F.defaults, opts);
            if (opts.keys !== undefined) {
                F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
            }
            F.group = group;
            return F._start(F.opts.index);
        },
        cancel: function () {
            var coming = F.coming;
            if (!coming || false === F.trigger("onCancel")) {
                return;
            }
            F.hideLoading();
            if (F.ajaxLoad) {
                F.ajaxLoad.abort();
            }
            F.ajaxLoad = null;
            if (F.imgPreload) {
                F.imgPreload.onload = F.imgPreload.onerror = null;
            }
            if (coming.wrap) {
                coming.wrap.stop(true, true).trigger("onReset").remove();
            }
            F.coming = null;
            if (!F.current) {
                F._afterZoomOut(coming);
            }
        },
        close: function (event) {
            F.cancel();
            if (false === F.trigger("beforeClose")) {
                return;
            }
            F.unbindEvents();
            if (!F.isActive) {
                return;
            }
            if (!F.isOpen || event === true) {
                $(".fancybox-wrap").stop(true).trigger("onReset").remove();
                F._afterZoomOut();
            } else {
                F.isOpen = F.isOpened = false;
                F.isClosing = true;
                $(".fancybox-item, .fancybox-nav").remove();
                F.wrap.stop(true, true).removeClass("fancybox-opened");
                F.transitions[F.current.closeMethod]();
            }
        },
        play: function (action) {
            var clear = function () {
                    clearTimeout(F.player.timer);
                },
                set = function () {
                    clear();
                    if (F.current && F.player.isActive) {
                        F.player.timer = setTimeout(F.next, F.current.playSpeed);
                    }
                },
                stop = function () {
                    clear();
                    D.unbind(".player");
                    F.player.isActive = false;
                    F.trigger("onPlayEnd");
                },
                start = function () {
                    if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
                        F.player.isActive = true;
                        D.bind({ "onCancel.player beforeClose.player": stop, "onUpdate.player": set, "beforeLoad.player": clear });
                        set();
                        F.trigger("onPlayStart");
                    }
                };
            if (action === true || (!F.player.isActive && action !== false)) {
                start();
            } else {
                stop();
            }
        },
        next: function (direction) {
            var current = F.current;
            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.next;
                }
                F.jumpto(current.index + 1, direction, "next");
            }
        },
        prev: function (direction) {
            var current = F.current;
            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.prev;
                }
                F.jumpto(current.index - 1, direction, "prev");
            }
        },
        jumpto: function (index, direction, router) {
            var current = F.current;
            if (!current) {
                return;
            }
            index = getScalar(index);
            F.direction = direction || current.direction[index >= current.index ? "next" : "prev"];
            F.router = router || "jumpto";
            if (current.loop) {
                if (index < 0) {
                    index = current.group.length + (index % current.group.length);
                }
                index = index % current.group.length;
            }
            if (current.group[index] !== undefined) {
                F.cancel();
                F._start(index);
            }
        },
        reposition: function (e, onlyAbsolute) {
            var current = F.current,
                wrap = current ? current.wrap : null,
                pos;
            if (wrap) {
                pos = F._getPosition(onlyAbsolute);
                if (e && e.type === "scroll") {
                    delete pos.position;
                    wrap.stop(true, true).animate(pos, 200);
                } else {
                    wrap.css(pos);
                    current.pos = $.extend({}, current.dim, pos);
                }
            }
        },
        update: function (e) {
            var type = e && e.type,
                anyway = !type || type === "orientationchange";
            if (anyway) {
                clearTimeout(didUpdate);
                didUpdate = null;
            }
            if (!F.isOpen || didUpdate) {
                return;
            }
            didUpdate = setTimeout(
                function () {
                    var current = F.current;
                    if (!current || F.isClosing) {
                        return;
                    }
                    F.wrap.removeClass("fancybox-tmp");
                    if (anyway || type === "load" || (type === "resize" && current.autoResize)) {
                        F._setDimension();
                    }
                    if (!(type === "scroll" && current.canShrink)) {
                        F.reposition(e);
                    }
                    F.trigger("onUpdate");
                    didUpdate = null;
                },
                anyway && !isTouch ? 0 : 300
            );
        },
        toggle: function (action) {
            if (F.isOpen) {
                F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;
                if (isTouch) {
                    F.wrap.removeAttr("style").addClass("fancybox-tmp");
                    F.trigger("onUpdate");
                }
                F.update();
            }
        },
        hideLoading: function () {
            D.unbind(".loading");
            $("#fancybox-loading").remove();
        },
        showLoading: function () {
            var el, viewport;
            F.hideLoading();
            el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo("body");
            D.bind("keydown.loading", function (e) {
                if ((e.which || e.keyCode) === 27) {
                    e.preventDefault();
                    F.cancel();
                }
            });
            if (!F.defaults.fixed) {
                viewport = F.getViewport();
                el.css({ position: "absolute", top: viewport.h * 0.5 + viewport.y, left: viewport.w * 0.5 + viewport.x });
            }
        },
        getViewport: function () {
            var locked = (F.current && F.current.locked) || false,
                rez = { x: W.scrollLeft(), y: W.scrollTop() };
            if (locked) {
                rez.w = locked[0].clientWidth;
                rez.h = locked[0].clientHeight;
            } else {
                rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
                rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
            }
            return rez;
        },
        unbindEvents: function () {
            if (F.wrap && isQuery(F.wrap)) {
                F.wrap.unbind(".fb");
            }
            D.unbind(".fb");
            W.unbind(".fb");
        },
        bindEvents: function () {
            var current = F.current,
                keys;
            if (!current) {
                return;
            }
            W.bind("orientationchange.fb" + (isTouch ? "" : " resize.fb") + (current.autoCenter && !current.locked ? " scroll.fb" : ""), F.update);
            keys = current.keys;
            if (keys) {
                D.bind("keydown.fb", function (e) {
                    var code = e.which || e.keyCode,
                        target = e.target || e.srcElement;
                    if (code === 27 && F.coming) {
                        return false;
                    }
                    if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is("[contenteditable]")))) {
                        $.each(keys, function (i, val) {
                            if (current.group.length > 1 && val[code] !== undefined) {
                                F[i](val[code]);
                                e.preventDefault();
                                return false;
                            }
                            if ($.inArray(code, val) > -1) {
                                F[i]();
                                e.preventDefault();
                                return false;
                            }
                        });
                    }
                });
            }
            if ($.fn.mousewheel && current.mouseWheel) {
                F.wrap.bind("mousewheel.fb", function (e, delta, deltaX, deltaY) {
                    var target = e.target || null,
                        parent = $(target),
                        canScroll = false;
                    while (parent.length) {
                        if (canScroll || parent.is(".fancybox-skin") || parent.is(".fancybox-wrap")) {
                            break;
                        }
                        canScroll = isScrollable(parent[0]);
                        parent = $(parent).parent();
                    }
                    if (delta !== 0 && !canScroll) {
                        if (F.group.length > 1 && !current.canShrink) {
                            if (deltaY > 0 || deltaX > 0) {
                                F.prev(deltaY > 0 ? "down" : "left");
                            } else if (deltaY < 0 || deltaX < 0) {
                                F.next(deltaY < 0 ? "up" : "right");
                            }
                            e.preventDefault();
                        }
                    }
                });
            }
        },
        trigger: function (event, o) {
            var ret,
                obj = o || F.coming || F.current;
            if (!obj) {
                return;
            }
            if ($.isFunction(obj[event])) {
                ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
            }
            if (ret === false) {
                return false;
            }
            if (obj.helpers) {
                $.each(obj.helpers, function (helper, opts) {
                    if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
                        F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
                    }
                });
            }
            D.trigger(event);
        },
        isImage: function (str) {
            return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
        },
        isSWF: function (str) {
            return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
        },
        _start: function (index) {
            var coming = {},
                obj,
                href,
                type,
                margin,
                padding;
            index = getScalar(index);
            obj = F.group[index] || null;
            if (!obj) {
                return false;
            }
            coming = $.extend(true, {}, F.opts, obj);
            margin = coming.margin;
            padding = coming.padding;
            if ($.type(margin) === "number") {
                coming.margin = [margin, margin, margin, margin];
            }
            if ($.type(padding) === "number") {
                coming.padding = [padding, padding, padding, padding];
            }
            if (coming.modal) {
                $.extend(true, coming, { closeBtn: false, closeClick: false, nextClick: false, arrows: false, mouseWheel: false, keys: null, helpers: { overlay: { closeClick: false } } });
            }
            if (coming.autoSize) {
                coming.autoWidth = coming.autoHeight = true;
            }
            if (coming.width === "auto") {
                coming.autoWidth = true;
            }
            if (coming.height === "auto") {
                coming.autoHeight = true;
            }
            coming.group = F.group;
            coming.index = index;
            F.coming = coming;
            if (false === F.trigger("beforeLoad")) {
                F.coming = null;
                return;
            }
            type = coming.type;
            href = coming.href;
            if (!type) {
                F.coming = null;
                if (F.current && F.router && F.router !== "jumpto") {
                    F.current.index = index;
                    return F[F.router](F.direction);
                }
                return false;
            }
            F.isActive = true;
            if (type === "image" || type === "swf") {
                coming.autoHeight = coming.autoWidth = false;
                coming.scrolling = "visible";
            }
            if (type === "image") {
                coming.aspectRatio = true;
            }
            if (type === "iframe" && isTouch) {
                coming.scrolling = "scroll";
            }
            coming.wrap = $(coming.tpl.wrap)
                .addClass("fancybox-" + (isTouch ? "mobile" : "desktop") + " fancybox-type-" + type + " fancybox-tmp " + coming.wrapCSS)
                .appendTo(coming.parent || "body");
            $.extend(coming, { skin: $(".fancybox-skin", coming.wrap), outer: $(".fancybox-outer", coming.wrap), inner: $(".fancybox-inner", coming.wrap) });
            $.each(["Top", "Right", "Bottom", "Left"], function (i, v) {
                coming.skin.css("padding" + v, getValue(coming.padding[i]));
            });
            F.trigger("onReady");
            if (type === "inline" || type === "html") {
                if (!coming.content || !coming.content.length) {
                    return F._error("content");
                }
            } else if (!href) {
                return F._error("href");
            }
            if (type === "image") {
                F._loadImage();
            } else if (type === "ajax") {
                F._loadAjax();
            } else if (type === "iframe") {
                F._loadIframe();
            } else {
                F._afterLoad();
            }
        },
        _error: function (type) {
            $.extend(F.coming, { type: "html", autoWidth: true, autoHeight: true, minWidth: 0, minHeight: 0, scrolling: "no", hasError: type, content: F.coming.tpl.error });
            F._afterLoad();
        },
        _loadImage: function () {
            var img = (F.imgPreload = new Image());
            img.onload = function () {
                this.onload = this.onerror = null;
                F.coming.width = this.width / F.opts.pixelRatio;
                F.coming.height = this.height / F.opts.pixelRatio;
                F._afterLoad();
            };
            img.onerror = function () {
                this.onload = this.onerror = null;
                F._error("image");
            };
            img.src = F.coming.href;
            if (img.complete !== true) {
                F.showLoading();
            }
        },
        _loadAjax: function () {
            var coming = F.coming;
            F.showLoading();
            F.ajaxLoad = $.ajax(
                $.extend({}, coming.ajax, {
                    url: coming.href,
                    error: function (jqXHR, textStatus) {
                        if (F.coming && textStatus !== "abort") {
                            F._error("ajax", jqXHR);
                        } else {
                            F.hideLoading();
                        }
                    },
                    success: function (data, textStatus) {
                        if (textStatus === "success") {
                            coming.content = data;
                            F._afterLoad();
                        }
                    },
                })
            );
        },
        _loadIframe: function () {
            var coming = F.coming,
                iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
                    .attr("scrolling", isTouch ? "auto" : coming.iframe.scrolling)
                    .attr("src", coming.href);
            $(coming.wrap).bind("onReset", function () {
                try {
                    $(this).find("iframe").hide().attr("src", "//about:blank").end().empty();
                } catch (e) {}
            });
            if (coming.iframe.preload) {
                F.showLoading();
                iframe.one("load", function () {
                    $(this).data("ready", 1);
                    if (!isTouch) {
                        $(this).bind("load.fb", F.update);
                    }
                    $(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                    F._afterLoad();
                });
            }
            coming.content = iframe.appendTo(coming.inner);
            if (!coming.iframe.preload) {
                F._afterLoad();
            }
        },
        _preloadImages: function () {
            var group = F.group,
                current = F.current,
                len = group.length,
                cnt = current.preload ? Math.min(current.preload, len - 1) : 0,
                item,
                i;
            for (i = 1; i <= cnt; i += 1) {
                item = group[(current.index + i) % len];
                if (item.type === "image" && item.href) {
                    new Image().src = item.href;
                }
            }
        },
        _afterLoad: function () {
            var coming = F.coming,
                previous = F.current,
                placeholder = "fancybox-placeholder",
                current,
                content,
                type,
                scrolling,
                href,
                embed;
            F.hideLoading();
            if (!coming || F.isActive === false) {
                return;
            }
            if (false === F.trigger("afterLoad", coming, previous)) {
                coming.wrap.stop(true).trigger("onReset").remove();
                F.coming = null;
                return;
            }
            if (previous) {
                F.trigger("beforeChange", previous);
                previous.wrap.stop(true).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove();
            }
            F.unbindEvents();
            current = coming;
            content = coming.content;
            type = coming.type;
            scrolling = coming.scrolling;
            $.extend(F, { wrap: current.wrap, skin: current.skin, outer: current.outer, inner: current.inner, current: current, previous: previous });
            href = current.href;
            switch (type) {
                case "inline":
                case "ajax":
                case "html":
                    if (current.selector) {
                        content = $("<div>").html(content).find(current.selector);
                    } else if (isQuery(content)) {
                        if (!content.data(placeholder)) {
                            content.data(
                                placeholder,
                                $('<div class="' + placeholder + '"></div>')
                                    .insertAfter(content)
                                    .hide()
                            );
                        }
                        content = content.show().detach();
                        current.wrap.bind("onReset", function () {
                            if ($(this).find(content).length) {
                                content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
                            }
                        });
                    }
                    break;
                case "image":
                    content = current.tpl.image.replace("{href}", href);
                    break;
                case "swf":
                    content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
                    embed = "";
                    $.each(current.swf, function (name, val) {
                        content += '<param name="' + name + '" value="' + val + '"></param>';
                        embed += " " + name + '="' + val + '"';
                    });
                    content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + "></embed></object>";
                    break;
            }
            if (!(isQuery(content) && content.parent().is(current.inner))) {
                current.inner.append(content);
            }
            F.trigger("beforeShow");
            current.inner.css("overflow", scrolling === "yes" ? "scroll" : scrolling === "no" ? "hidden" : scrolling);
            F._setDimension();
            F.reposition();
            F.isOpen = false;
            F.coming = null;
            F.bindEvents();
            if (!F.isOpened) {
                $(".fancybox-wrap").not(current.wrap).stop(true).trigger("onReset").remove();
            } else if (previous.prevMethod) {
                F.transitions[previous.prevMethod]();
            }
            F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();
            F._preloadImages();
        },
        _setDimension: function () {
            var viewport = F.getViewport(),
                steps = 0,
                canShrink = false,
                canExpand = false,
                wrap = F.wrap,
                skin = F.skin,
                inner = F.inner,
                current = F.current,
                width = current.width,
                height = current.height,
                minWidth = current.minWidth,
                minHeight = current.minHeight,
                maxWidth = current.maxWidth,
                maxHeight = current.maxHeight,
                scrolling = current.scrolling,
                scrollOut = current.scrollOutside ? current.scrollbarWidth : 0,
                margin = current.margin,
                wMargin = getScalar(margin[1] + margin[3]),
                hMargin = getScalar(margin[0] + margin[2]),
                wPadding,
                hPadding,
                wSpace,
                hSpace,
                origWidth,
                origHeight,
                origMaxWidth,
                origMaxHeight,
                ratio,
                width_,
                height_,
                maxWidth_,
                maxHeight_,
                iframe,
                body;
            wrap.add(skin).add(inner).width("auto").height("auto").removeClass("fancybox-tmp");
            wPadding = getScalar(skin.outerWidth(true) - skin.width());
            hPadding = getScalar(skin.outerHeight(true) - skin.height());
            wSpace = wMargin + wPadding;
            hSpace = hMargin + hPadding;
            origWidth = isPercentage(width) ? ((viewport.w - wSpace) * getScalar(width)) / 100 : width;
            origHeight = isPercentage(height) ? ((viewport.h - hSpace) * getScalar(height)) / 100 : height;
            if (current.type === "iframe") {
                iframe = current.content;
                if (current.autoHeight && iframe.data("ready") === 1) {
                    try {
                        if (iframe[0].contentWindow.document.location) {
                            inner.width(origWidth).height(9999);
                            body = iframe.contents().find("body");
                            if (scrollOut) {
                                body.css("overflow-x", "hidden");
                            }
                            origHeight = body.outerHeight(true);
                        }
                    } catch (e) {}
                }
            } else if (current.autoWidth || current.autoHeight) {
                inner.addClass("fancybox-tmp");
                if (!current.autoWidth) {
                    inner.width(origWidth);
                }
                if (!current.autoHeight) {
                    inner.height(origHeight);
                }
                if (current.autoWidth) {
                    origWidth = inner.width();
                }
                if (current.autoHeight) {
                    origHeight = inner.height();
                }
                inner.removeClass("fancybox-tmp");
            }
            width = getScalar(origWidth);
            height = getScalar(origHeight);
            ratio = origWidth / origHeight;
            minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, "w") - wSpace : minWidth);
            maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, "w") - wSpace : maxWidth);
            minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, "h") - hSpace : minHeight);
            maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, "h") - hSpace : maxHeight);
            origMaxWidth = maxWidth;
            origMaxHeight = maxHeight;
            if (current.fitToView) {
                maxWidth = Math.min(viewport.w - wSpace, maxWidth);
                maxHeight = Math.min(viewport.h - hSpace, maxHeight);
            }
            maxWidth_ = viewport.w - wMargin;
            maxHeight_ = viewport.h - hMargin;
            if (current.aspectRatio) {
                if (width > maxWidth) {
                    width = maxWidth;
                    height = getScalar(width / ratio);
                }
                if (height > maxHeight) {
                    height = maxHeight;
                    width = getScalar(height * ratio);
                }
                if (width < minWidth) {
                    width = minWidth;
                    height = getScalar(width / ratio);
                }
                if (height < minHeight) {
                    height = minHeight;
                    width = getScalar(height * ratio);
                }
            } else {
                width = Math.max(minWidth, Math.min(width, maxWidth));
                if (current.autoHeight && current.type !== "iframe") {
                    inner.width(width);
                    height = inner.height();
                }
                height = Math.max(minHeight, Math.min(height, maxHeight));
            }
            if (current.fitToView) {
                inner.width(width).height(height);
                wrap.width(width + wPadding);
                width_ = wrap.width();
                height_ = wrap.height();
                if (current.aspectRatio) {
                    while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
                        if (steps++ > 19) {
                            break;
                        }
                        height = Math.max(minHeight, Math.min(maxHeight, height - 10));
                        width = getScalar(height * ratio);
                        if (width < minWidth) {
                            width = minWidth;
                            height = getScalar(width / ratio);
                        }
                        if (width > maxWidth) {
                            width = maxWidth;
                            height = getScalar(width / ratio);
                        }
                        inner.width(width).height(height);
                        wrap.width(width + wPadding);
                        width_ = wrap.width();
                        height_ = wrap.height();
                    }
                } else {
                    width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
                    height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
                }
            }
            if (scrollOut && scrolling === "auto" && height < origHeight && width + wPadding + scrollOut < maxWidth_) {
                width += scrollOut;
            }
            inner.width(width).height(height);
            wrap.width(width + wPadding);
            width_ = wrap.width();
            height_ = wrap.height();
            canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
            canExpand = current.aspectRatio ? width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight : (width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight);
            $.extend(current, {
                dim: { width: getValue(width_), height: getValue(height_) },
                origWidth: origWidth,
                origHeight: origHeight,
                canShrink: canShrink,
                canExpand: canExpand,
                wPadding: wPadding,
                hPadding: hPadding,
                wrapSpace: height_ - skin.outerHeight(true),
                skinSpace: skin.height() - height,
            });
            if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
                inner.height("auto");
            }
        },
        _getPosition: function (onlyAbsolute) {
            var current = F.current,
                viewport = F.getViewport(),
                margin = current.margin,
                width = F.wrap.width() + margin[1] + margin[3],
                height = F.wrap.height() + margin[0] + margin[2],
                rez = { position: "absolute", top: margin[0], left: margin[3] };
            if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
                rez.position = "fixed";
            } else if (!current.locked) {
                rez.top += viewport.y;
                rez.left += viewport.x;
            }
            rez.top = getValue(Math.max(rez.top, rez.top + (viewport.h - height) * current.topRatio));
            rez.left = getValue(Math.max(rez.left, rez.left + (viewport.w - width) * current.leftRatio));
            return rez;
        },
        _afterZoomIn: function () {
            var current = F.current;
            if (!current) {
                return;
            }
            F.isOpen = F.isOpened = true;
            F.wrap.css("overflow", "visible").addClass("fancybox-opened");
            F.update();
            if (current.closeClick || (current.nextClick && F.group.length > 1)) {
                F.inner.css("cursor", "pointer").bind("click.fb", function (e) {
                    if (!$(e.target).is("a") && !$(e.target).parent().is("a")) {
                        e.preventDefault();
                        F[current.closeClick ? "close" : "next"]();
                    }
                });
            }
            if (current.closeBtn) {
                $(current.tpl.closeBtn)
                    .appendTo(F.skin)
                    .bind("click.fb", function (e) {
                        e.preventDefault();
                        F.close();
                    });
            }
            if (current.arrows && F.group.length > 1) {
                if (current.loop || current.index > 0) {
                    $(current.tpl.prev).appendTo(F.outer).bind("click.fb", F.prev);
                }
                if (current.loop || current.index < F.group.length - 1) {
                    $(current.tpl.next).appendTo(F.outer).bind("click.fb", F.next);
                }
            }
            F.trigger("afterShow");
            if (!current.loop && current.index === current.group.length - 1) {
                F.play(false);
            } else if (F.opts.autoPlay && !F.player.isActive) {
                F.opts.autoPlay = false;
                F.play();
            }
        },
        _afterZoomOut: function (obj) {
            obj = obj || F.current;
            $(".fancybox-wrap").trigger("onReset").remove();
            $.extend(F, { group: {}, opts: {}, router: false, current: null, isActive: false, isOpened: false, isOpen: false, isClosing: false, wrap: null, skin: null, outer: null, inner: null });
            F.trigger("afterClose", obj);
        },
    });
    F.transitions = {
        getOrigPosition: function () {
            var current = F.current,
                element = current.element,
                orig = current.orig,
                pos = {},
                width = 50,
                height = 50,
                hPadding = current.hPadding,
                wPadding = current.wPadding,
                viewport = F.getViewport();
            if (!orig && current.isDom && element.is(":visible")) {
                orig = element.find("img:first");
                if (!orig.length) {
                    orig = element;
                }
            }
            if (isQuery(orig)) {
                pos = orig.offset();
                if (orig.is("img")) {
                    width = orig.outerWidth();
                    height = orig.outerHeight();
                }
            } else {
                pos.top = viewport.y + (viewport.h - height) * current.topRatio;
                pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
            }
            if (F.wrap.css("position") === "fixed" || current.locked) {
                pos.top -= viewport.y;
                pos.left -= viewport.x;
            }
            pos = { top: getValue(pos.top - hPadding * current.topRatio), left: getValue(pos.left - wPadding * current.leftRatio), width: getValue(width + wPadding), height: getValue(height + hPadding) };
            return pos;
        },
        step: function (now, fx) {
            var ratio,
                padding,
                value,
                prop = fx.prop,
                current = F.current,
                wrapSpace = current.wrapSpace,
                skinSpace = current.skinSpace;
            if (prop === "width" || prop === "height") {
                ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);
                if (F.isClosing) {
                    ratio = 1 - ratio;
                }
                padding = prop === "width" ? current.wPadding : current.hPadding;
                value = now - padding;
                F.skin[prop](getScalar(prop === "width" ? value : value - wrapSpace * ratio));
                F.inner[prop](getScalar(prop === "width" ? value : value - wrapSpace * ratio - skinSpace * ratio));
            }
        },
        zoomIn: function () {
            var current = F.current,
                startPos = current.pos,
                effect = current.openEffect,
                elastic = effect === "elastic",
                endPos = $.extend({ opacity: 1 }, startPos);
            delete endPos.position;
            if (elastic) {
                startPos = this.getOrigPosition();
                if (current.openOpacity) {
                    startPos.opacity = 0.1;
                }
            } else if (effect === "fade") {
                startPos.opacity = 0.1;
            }
            F.wrap.css(startPos).animate(endPos, { duration: effect === "none" ? 0 : current.openSpeed, easing: current.openEasing, step: elastic ? this.step : null, complete: F._afterZoomIn });
        },
        zoomOut: function () {
            var current = F.current,
                effect = current.closeEffect,
                elastic = effect === "elastic",
                endPos = { opacity: 0.1 };
            if (elastic) {
                endPos = this.getOrigPosition();
                if (current.closeOpacity) {
                    endPos.opacity = 0.1;
                }
            }
            F.wrap.animate(endPos, { duration: effect === "none" ? 0 : current.closeSpeed, easing: current.closeEasing, step: elastic ? this.step : null, complete: F._afterZoomOut });
        },
        changeIn: function () {
            var current = F.current,
                effect = current.nextEffect,
                startPos = current.pos,
                endPos = { opacity: 1 },
                direction = F.direction,
                distance = 200,
                field;
            startPos.opacity = 0.1;
            if (effect === "elastic") {
                field = direction === "down" || direction === "up" ? "top" : "left";
                if (direction === "down" || direction === "right") {
                    startPos[field] = getValue(getScalar(startPos[field]) - distance);
                    endPos[field] = "+=" + distance + "px";
                } else {
                    startPos[field] = getValue(getScalar(startPos[field]) + distance);
                    endPos[field] = "-=" + distance + "px";
                }
            }
            if (effect === "none") {
                F._afterZoomIn();
            } else {
                F.wrap.css(startPos).animate(endPos, { duration: current.nextSpeed, easing: current.nextEasing, complete: F._afterZoomIn });
            }
        },
        changeOut: function () {
            var previous = F.previous,
                effect = previous.prevEffect,
                endPos = { opacity: 0.1 },
                direction = F.direction,
                distance = 200;
            if (effect === "elastic") {
                endPos[direction === "down" || direction === "up" ? "top" : "left"] = (direction === "up" || direction === "left" ? "-" : "+") + "=" + distance + "px";
            }
            previous.wrap.animate(endPos, {
                duration: effect === "none" ? 0 : previous.prevSpeed,
                easing: previous.prevEasing,
                complete: function () {
                    $(this).trigger("onReset").remove();
                },
            });
        },
    };
    F.helpers.overlay = {
        defaults: { closeClick: true, speedOut: 200, showEarly: true, css: {}, locked: !isTouch, fixed: true },
        overlay: null,
        fixed: false,
        el: $("html"),
        create: function (opts) {
            opts = $.extend({}, this.defaults, opts);
            if (this.overlay) {
                this.close();
            }
            this.overlay = $('<div class="fancybox-overlay"></div>').appendTo(F.coming ? F.coming.parent : opts.parent);
            this.fixed = false;
            if (opts.fixed && F.defaults.fixed) {
                this.overlay.addClass("fancybox-overlay-fixed");
                this.fixed = true;
            }
        },
        open: function (opts) {
            var that = this;
            opts = $.extend({}, this.defaults, opts);
            if (this.overlay) {
                this.overlay.unbind(".overlay").width("auto").height("auto");
            } else {
                this.create(opts);
            }
            if (!this.fixed) {
                W.bind("resize.overlay", $.proxy(this.update, this));
                this.update();
            }
            if (opts.closeClick) {
                this.overlay.bind("click.overlay", function (e) {
                    if ($(e.target).hasClass("fancybox-overlay")) {
                        if (F.isActive) {
                            F.close();
                        } else {
                            that.close();
                        }
                        return false;
                    }
                });
            }
            this.overlay.css(opts.css).show();
        },
        close: function () {
            var scrollV, scrollH;
            W.unbind("resize.overlay");
            if (this.el.hasClass("fancybox-lock")) {
                $(".fancybox-margin").removeClass("fancybox-margin");
                scrollV = W.scrollTop();
                scrollH = W.scrollLeft();
                this.el.removeClass("fancybox-lock");
                W.scrollTop(scrollV).scrollLeft(scrollH);
            }
            $(".fancybox-overlay").remove().hide();
            $.extend(this, { overlay: null, fixed: false });
        },
        update: function () {
            var width = "100%",
                offsetWidth;
            this.overlay.width(width).height("100%");
            if (IE) {
                offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (D.width() > offsetWidth) {
                    width = D.width();
                }
            } else if (D.width() > W.width()) {
                width = D.width();
            }
            this.overlay.width(width).height(D.height());
        },
        onReady: function (opts, obj) {
            var overlay = this.overlay;
            $(".fancybox-overlay").stop(true, true);
            if (!overlay) {
                this.create(opts);
            }
            if (opts.locked && this.fixed && obj.fixed) {
                if (!overlay) {
                    this.margin = D.height() > W.height() ? $("html").css("margin-right").replace("px", "") : false;
                }
                obj.locked = this.overlay.append(obj.wrap);
                obj.fixed = false;
            }
            if (opts.showEarly === true) {
                this.beforeShow.apply(this, arguments);
            }
        },
        beforeShow: function (opts, obj) {
            var scrollV, scrollH;
            if (obj.locked) {
                if (this.margin !== false) {
                    $("*")
                        .filter(function () {
                            return $(this).css("position") === "fixed" && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap");
                        })
                        .addClass("fancybox-margin");
                    this.el.addClass("fancybox-margin");
                }
                scrollV = W.scrollTop();
                scrollH = W.scrollLeft();
                this.el.addClass("fancybox-lock");
                W.scrollTop(scrollV).scrollLeft(scrollH);
            }
            this.open(opts);
        },
        onUpdate: function () {
            if (!this.fixed) {
                this.update();
            }
        },
        afterClose: function (opts) {
            if (this.overlay && !F.coming) {
                this.overlay.fadeOut(opts.speedOut, $.proxy(this.close, this));
            }
        },
    };
    F.helpers.title = {
        defaults: { type: "float", position: "bottom" },
        beforeShow: function (opts) {
            var current = F.current,
                text = current.title,
                type = opts.type,
                title,
                target;
            if ($.isFunction(text)) {
                text = text.call(current.element, current);
            }
            if (!isString(text) || $.trim(text) === "") {
                return;
            }
            title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + "</div>");
            switch (type) {
                case "inside":
                    target = F.skin;
                    break;
                case "outside":
                    target = F.wrap;
                    break;
                case "over":
                    target = F.inner;
                    break;
                default:
                    target = F.skin;
                    title.appendTo("body");
                    if (IE) {
                        title.width(title.width());
                    }
                    title.wrapInner('<span class="child"></span>');
                    F.current.margin[2] += Math.abs(getScalar(title.css("margin-bottom")));
                    break;
            }
            title[opts.position === "top" ? "prependTo" : "appendTo"](target);
        },
    };
    $.fn.fancybox = function (options) {
        var index,
            that = $(this),
            selector = this.selector || "",
            run = function (e) {
                var what = $(this).blur(),
                    idx = index,
                    relType,
                    relVal;
                if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is(".fancybox-wrap")) {
                    relType = options.groupAttr || "data-fancybox-group";
                    relVal = what.attr(relType);
                    if (!relVal) {
                        relType = "rel";
                        relVal = what.get(0)[relType];
                    }
                    if (relVal && relVal !== "" && relVal !== "nofollow") {
                        what = selector.length ? $(selector) : that;
                        what = what.filter("[" + relType + '="' + relVal + '"]');
                        idx = what.index(this);
                    }
                    options.index = idx;
                    if (F.open(what, options) !== false) {
                        e.preventDefault();
                    }
                }
            };
        options = options || {};
        index = options.index || 0;
        if (!selector || options.live === false) {
            that.unbind("click.fb-start").bind("click.fb-start", run);
        } else {
            D.undelegate(selector, "click.fb-start").delegate(selector + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", run);
        }
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this;
    };
    D.ready(function () {
        var w1, w2;
        if ($.scrollbarWidth === undefined) {
            $.scrollbarWidth = function () {
                var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                    child = parent.children(),
                    width = child.innerWidth() - child.height(99).innerWidth();
                parent.remove();
                return width;
            };
        }
        if ($.support.fixedPosition === undefined) {
            $.support.fixedPosition = (function () {
                var elem = $('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                    fixed = elem[0].offsetTop === 20 || elem[0].offsetTop === 15;
                elem.remove();
                return fixed;
            })();
        }
        $.extend(F.defaults, { scrollbarWidth: $.scrollbarWidth(), fixed: $.support.fixedPosition, parent: $("body") });
        w1 = $(window).width();
        H.addClass("fancybox-lock-test");
        w2 = $(window).width();
        H.removeClass("fancybox-lock-test");
        $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
    });
})(window, document, jQuery);
/** * jQuery Validation Plugin 1.8.0 */
(function (c) {
    c.extend(c.fn, {
        validate: function (a) {
            if (this.length) {
                var b = c.data(this[0], "validator");
                if (b) return b;
                b = new c.validator(a, this[0]);
                c.data(this[0], "validator", b);
                if (b.settings.onsubmit) {
                    this.find("input, button")
                        .filter(".cancel")
                        .click(function () {
                            b.cancelSubmit = true;
                        });
                    b.settings.submitHandler &&
                        this.find("input, button")
                            .filter(":submit")
                            .click(function () {
                                b.submitButton = this;
                            });
                    this.submit(function (d) {
                        function e() {
                            if (b.settings.submitHandler) {
                                if (b.submitButton) var f = c("<input type='hidden'/>").attr("name", b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);
                                b.settings.submitHandler.call(b, b.currentForm);
                                b.submitButton && f.remove();
                                return false;
                            }
                            return true;
                        }
                        b.settings.debug && d.preventDefault();
                        if (b.cancelSubmit) {
                            b.cancelSubmit = false;
                            return e();
                        }
                        if (b.form()) {
                            if (b.pendingRequest) {
                                b.formSubmitted = true;
                                return false;
                            }
                            return e();
                        } else {
                            b.focusInvalid();
                            return false;
                        }
                    });
                }
                return b;
            } else a && a.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
        },
        valid: function () {
            if (c(this[0]).is("form")) return this.validate().form();
            else {
                var a = true,
                    b = c(this[0].form).validate();
                this.each(function () {
                    a &= b.element(this);
                });
                return a;
            }
        },
        removeAttrs: function (a) {
            var b = {},
                d = this;
            c.each(a.split(/\s/), function (e, f) {
                b[f] = d.attr(f);
                d.removeAttr(f);
            });
            return b;
        },
        rules: function (a, b) {
            var d = this[0];
            if (a) {
                var e = c.data(d.form, "validator").settings,
                    f = e.rules,
                    g = c.validator.staticRules(d);
                switch (a) {
                    case "add":
                        c.extend(g, c.validator.normalizeRule(b));
                        f[d.name] = g;
                        if (b.messages) e.messages[d.name] = c.extend(e.messages[d.name], b.messages);
                        break;
                    case "remove":
                        if (!b) {
                            delete f[d.name];
                            return g;
                        }
                        var h = {};
                        c.each(b.split(/\s/), function (j, i) {
                            h[i] = g[i];
                            delete g[i];
                        });
                        return h;
                }
            }
            d = c.validator.normalizeRules(c.extend({}, c.validator.metadataRules(d), c.validator.classRules(d), c.validator.attributeRules(d), c.validator.staticRules(d)), d);
            if (d.required) {
                e = d.required;
                delete d.required;
                d = c.extend({ required: e }, d);
            }
            return d;
        },
    });
    c.extend(c.expr[":"], {
        blank: function (a) {
            return !c.trim("" + a.value);
        },
        filled: function (a) {
            return !!c.trim("" + a.value);
        },
        unchecked: function (a) {
            return !a.checked;
        },
    });
    c.validator = function (a, b) {
        this.settings = c.extend(true, {}, c.validator.defaults, a);
        this.currentForm = b;
        this.init();
    };
    c.validator.format = function (a, b) {
        if (arguments.length == 1)
            return function () {
                var d = c.makeArray(arguments);
                d.unshift(a);
                return c.validator.format.apply(this, d);
            };
        if (arguments.length > 2 && b.constructor != Array) b = c.makeArray(arguments).slice(1);
        if (b.constructor != Array) b = [b];
        c.each(b, function (d, e) {
            a = a.replace(RegExp("\\{" + d + "\\}", "g"), e);
        });
        return a;
    };
    c.extend(c.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: c([]),
            errorLabelContainer: c([]),
            onsubmit: true,
            ignore: [],
            ignoreTitle: false,
            onfocusin: function (a) {
                this.lastActive = a;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass);
                    this.addWrapper(this.errorsFor(a)).hide();
                }
            },
            onfocusout: function (a) {
                if (!this.checkable(a) && (a.name in this.submitted || !this.optional(a))) this.element(a);
            },
            onkeyup: function (a) {
                if (a.name in this.submitted || a == this.lastElement) this.element(a);
            },
            onclick: function (a) {
                if (a.name in this.submitted) this.element(a);
                else a.parentNode.name in this.submitted && this.element(a.parentNode);
            },
            highlight: function (a, b, d) {
                c(a).addClass(b).removeClass(d);
            },
            unhighlight: function (a, b, d) {
                c(a).removeClass(b).addClass(d);
            },
        },
        setDefaults: function (a) {
            c.extend(c.validator.defaults, a);
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: c.validator.format("Please enter no more than {0} characters."),
            minlength: c.validator.format("Please enter at least {0} characters."),
            rangelength: c.validator.format("Please enter a value between {0} and {1} characters long."),
            range: c.validator.format("Please enter a value between {0} and {1}."),
            max: c.validator.format("Please enter a value less than or equal to {0}."),
            min: c.validator.format("Please enter a value greater than or equal to {0}."),
        },
        autoCreateRanges: false,
        prototype: {
            init: function () {
                function a(e) {
                    var f = c.data(this[0].form, "validator");
                    e = "on" + e.type.replace(/^validate/, "");
                    f.settings[e] && f.settings[e].call(f, this[0]);
                }
                this.labelContainer = c(this.settings.errorLabelContainer);
                this.errorContext = (this.labelContainer.length && this.labelContainer) || c(this.currentForm);
                this.containers = c(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var b = (this.groups = {});
                c.each(this.settings.groups, function (e, f) {
                    c.each(f.split(/\s/), function (g, h) {
                        b[h] = e;
                    });
                });
                var d = this.settings.rules;
                c.each(d, function (e, f) {
                    d[e] = c.validator.normalizeRule(f);
                });
                c(this.currentForm).validateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", a).validateDelegate(":radio, :checkbox, select, option", "click", a);
                this.settings.invalidHandler && c(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
            },
            form: function () {
                this.checkForm();
                c.extend(this.submitted, this.errorMap);
                this.invalid = c.extend({}, this.errorMap);
                this.valid() || c(this.currentForm).triggerHandler("invalid-form", [this]);
                this.showErrors();
                return this.valid();
            },
            checkForm: function () {
                this.prepareForm();
                for (var a = 0, b = (this.currentElements = this.elements()); b[a]; a++) this.check(b[a]);
                return this.valid();
            },
            element: function (a) {
                this.lastElement = a = this.clean(a);
                this.prepareElement(a);
                this.currentElements = c(a);
                var b = this.check(a);
                if (b) delete this.invalid[a.name];
                else this.invalid[a.name] = true;
                if (!this.numberOfInvalids()) this.toHide = this.toHide.add(this.containers);
                this.showErrors();
                return b;
            },
            showErrors: function (a) {
                if (a) {
                    c.extend(this.errorMap, a);
                    this.errorList = [];
                    for (var b in a) this.errorList.push({ message: a[b], element: this.findByName(b)[0] });
                    this.successList = c.grep(this.successList, function (d) {
                        return !(d.name in a);
                    });
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
            },
            resetForm: function () {
                c.fn.resetForm && c(this.currentForm).resetForm();
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass);
            },
            numberOfInvalids: function () {
                return this.objectLength(this.invalid);
            },
            objectLength: function (a) {
                var b = 0,
                    d;
                for (d in a) b++;
                return b;
            },
            hideErrors: function () {
                this.addWrapper(this.toHide).hide();
            },
            valid: function () {
                return this.size() == 0;
            },
            size: function () {
                return this.errorList.length;
            },
            focusInvalid: function () {
                if (this.settings.focusInvalid)
                    try {
                        c(this.findLastActive() || (this.errorList.length && this.errorList[0].element) || [])
                            .filter(":visible")
                            .focus()
                            .trigger("focusin");
                    } catch (a) {}
            },
            findLastActive: function () {
                var a = this.lastActive;
                return (
                    a &&
                    c.grep(this.errorList, function (b) {
                        return b.element.name == a.name;
                    }).length == 1 &&
                    a
                );
            },
            elements: function () {
                var a = this,
                    b = {};
                return c([])
                    .add(this.currentForm.elements)
                    .filter(":input")
                    .not(":submit, :reset, :image, [disabled]")
                    .not(this.settings.ignore)
                    .filter(function () {
                        !this.name && a.settings.debug && window.console && console.error("%o has no name assigned", this);
                        if (this.name in b || !a.objectLength(c(this).rules())) return false;
                        return (b[this.name] = true);
                    });
            },
            clean: function (a) {
                return c(a)[0];
            },
            errors: function () {
                return c(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext);
            },
            reset: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = c([]);
                this.toHide = c([]);
                this.currentElements = c([]);
            },
            prepareForm: function () {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            },
            prepareElement: function (a) {
                this.reset();
                this.toHide = this.errorsFor(a);
            },
            check: function (a) {
                a = this.clean(a);
                if (this.checkable(a)) a = this.findByName(a.name).not(this.settings.ignore)[0];
                var b = c(a).rules(),
                    d = false,
                    e;
                for (e in b) {
                    var f = { method: e, parameters: b[e] };
                    try {
                        var g = c.validator.methods[e].call(this, a.value.replace(/\r/g, ""), a, f.parameters);
                        if (g == "dependency-mismatch") d = true;
                        else {
                            d = false;
                            if (g == "pending") {
                                this.toHide = this.toHide.not(this.errorsFor(a));
                                return;
                            }
                            if (!g) {
                                this.formatAndAdd(a, f);
                                return false;
                            }
                        }
                    } catch (h) {
                        this.settings.debug && window.console && console.log("exception occured when checking element " + a.id + ", check the '" + f.method + "' method", h);
                        throw h;
                    }
                }
                if (!d) {
                    this.objectLength(b) && this.successList.push(a);
                    return true;
                }
            },
            customMetaMessage: function (a, b) {
                if (c.metadata) {
                    var d = this.settings.meta ? c(a).metadata()[this.settings.meta] : c(a).metadata();
                    return d && d.messages && d.messages[b];
                }
            },
            customMessage: function (a, b) {
                var d = this.settings.messages[a];
                return d && (d.constructor == String ? d : d[b]);
            },
            findDefined: function () {
                for (var a = 0; a < arguments.length; a++) if (arguments[a] !== undefined) return arguments[a];
            },
            defaultMessage: function (a, b) {
                return this.findDefined(
                    this.customMessage(a.name, b),
                    this.customMetaMessage(a, b),
                    (!this.settings.ignoreTitle && a.title) || undefined,
                    c.validator.messages[b],
                    "<strong>Warning: No message defined for " + a.name + "</strong>"
                );
            },
            formatAndAdd: function (a, b) {
                var d = this.defaultMessage(a, b.method),
                    e = /\$?\{(\d+)\}/g;
                if (typeof d == "function") d = d.call(this, b.parameters, a);
                else if (e.test(d)) d = jQuery.format(d.replace(e, "{$1}"), b.parameters);
                this.errorList.push({ message: d, element: a });
                this.errorMap[a.name] = d;
                this.submitted[a.name] = d;
            },
            addWrapper: function (a) {
                if (this.settings.wrapper) a = a.add(a.parent(this.settings.wrapper));
                return a;
            },
            defaultShowErrors: function () {
                for (var a = 0; this.errorList[a]; a++) {
                    var b = this.errorList[a];
                    this.settings.highlight && this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass);
                    this.showLabel(b.element, b.message);
                }
                if (this.errorList.length) this.toShow = this.toShow.add(this.containers);
                if (this.settings.success) for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight) {
                    a = 0;
                    for (b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            },
            validElements: function () {
                return this.currentElements.not(this.invalidElements());
            },
            invalidElements: function () {
                return c(this.errorList).map(function () {
                    return this.element;
                });
            },
            showLabel: function (a, b) {
                var d = this.errorsFor(a);
                if (d.length) {
                    d.removeClass().addClass(this.settings.errorClass);
                    d.attr("generated") && d.html(b);
                } else {
                    d = c("<" + this.settings.errorElement + "/>")
                        .attr({ for: this.idOrName(a), generated: true })
                        .addClass(this.settings.errorClass)
                        .html(b || "");
                    if (this.settings.wrapper)
                        d = d
                            .hide()
                            .show()
                            .wrap("<" + this.settings.wrapper + "/>")
                            .parent();
                    this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, c(a)) : d.insertAfter(a));
                }
                if (!b && this.settings.success) {
                    d.text("");
                    typeof this.settings.success == "string" ? d.addClass(this.settings.success) : this.settings.success(d);
                }
                this.toShow = this.toShow.add(d);
            },
            errorsFor: function (a) {
                var b = this.idOrName(a);
                return this.errors().filter(function () {
                    return c(this).attr("for") == b;
                });
            },
            idOrName: function (a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
            },
            checkable: function (a) {
                return /radio|checkbox/i.test(a.type);
            },
            findByName: function (a) {
                var b = this.currentForm;
                return c(document.getElementsByName(a)).map(function (d, e) {
                    return (e.form == b && e.name == a && e) || null;
                });
            },
            getLength: function (a, b) {
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        return c("option:selected", b).length;
                    case "input":
                        if (this.checkable(b)) return this.findByName(b.name).filter(":checked").length;
                }
                return a.length;
            },
            depend: function (a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : true;
            },
            dependTypes: {
                boolean: function (a) {
                    return a;
                },
                string: function (a, b) {
                    return !!c(a, b.form).length;
                },
                function: function (a, b) {
                    return a(b);
                },
            },
            optional: function (a) {
                return !c.validator.methods.required.call(this, c.trim(a.value), a) && "dependency-mismatch";
            },
            startRequest: function (a) {
                if (!this.pending[a.name]) {
                    this.pendingRequest++;
                    this.pending[a.name] = true;
                }
            },
            stopRequest: function (a, b) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) this.pendingRequest = 0;
                delete this.pending[a.name];
                if (b && this.pendingRequest == 0 && this.formSubmitted && this.form()) {
                    c(this.currentForm).submit();
                    this.formSubmitted = false;
                } else if (!b && this.pendingRequest == 0 && this.formSubmitted) {
                    c(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            },
            previousValue: function (a) {
                return c.data(a, "previousValue") || c.data(a, "previousValue", { old: null, valid: true, message: this.defaultMessage(a, "remote") });
            },
        },
        classRuleSettings: {
            required: { required: true },
            email: { email: true },
            url: { url: true },
            date: { date: true },
            dateISO: { dateISO: true },
            dateDE: { dateDE: true },
            number: { number: true },
            numberDE: { numberDE: true },
            digits: { digits: true },
            creditcard: { creditcard: true },
        },
        addClassRules: function (a, b) {
            a.constructor == String ? (this.classRuleSettings[a] = b) : c.extend(this.classRuleSettings, a);
        },
        classRules: function (a) {
            var b = {};
            (a = c(a).attr("class")) &&
                c.each(a.split(" "), function () {
                    this in c.validator.classRuleSettings && c.extend(b, c.validator.classRuleSettings[this]);
                });
            return b;
        },
        attributeRules: function (a) {
            var b = {};
            a = c(a);
            for (var d in c.validator.methods) {
                var e = a.attr(d);
                if (e) b[d] = e;
            }
            b.maxlength && /-1|2147483647|524288/.test(b.maxlength) && delete b.maxlength;
            return b;
        },
        metadataRules: function (a) {
            if (!c.metadata) return {};
            var b = c.data(a.form, "validator").settings.meta;
            return b ? c(a).metadata()[b] : c(a).metadata();
        },
        staticRules: function (a) {
            var b = {},
                d = c.data(a.form, "validator");
            if (d.settings.rules) b = c.validator.normalizeRule(d.settings.rules[a.name]) || {};
            return b;
        },
        normalizeRules: function (a, b) {
            c.each(a, function (d, e) {
                if (e === false) delete a[d];
                else if (e.param || e.depends) {
                    var f = true;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!c(e.depends, b.form).length;
                            break;
                        case "function":
                            f = e.depends.call(b, b);
                    }
                    if (f) a[d] = e.param !== undefined ? e.param : true;
                    else delete a[d];
                }
            });
            c.each(a, function (d, e) {
                a[d] = c.isFunction(e) ? e(b) : e;
            });
            c.each(["minlength", "maxlength", "min", "max"], function () {
                if (a[this]) a[this] = Number(a[this]);
            });
            c.each(["rangelength", "range"], function () {
                if (a[this]) a[this] = [Number(a[this][0]), Number(a[this][1])];
            });
            if (c.validator.autoCreateRanges) {
                if (a.min && a.max) {
                    a.range = [a.min, a.max];
                    delete a.min;
                    delete a.max;
                }
                if (a.minlength && a.maxlength) {
                    a.rangelength = [a.minlength, a.maxlength];
                    delete a.minlength;
                    delete a.maxlength;
                }
            }
            a.messages && delete a.messages;
            return a;
        },
        normalizeRule: function (a) {
            if (typeof a == "string") {
                var b = {};
                c.each(a.split(/\s/), function () {
                    b[this] = true;
                });
                a = b;
            }
            return a;
        },
        addMethod: function (a, b, d) {
            c.validator.methods[a] = b;
            c.validator.messages[a] = d != undefined ? d : c.validator.messages[a];
            b.length < 3 && c.validator.addClassRules(a, c.validator.normalizeRule(a));
        },
        methods: {
            required: function (a, b, d) {
                if (!this.depend(d, b)) return "dependency-mismatch";
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        return (a = c(b).val()) && a.length > 0;
                    case "input":
                        if (this.checkable(b)) return this.getLength(a, b) > 0;
                    default:
                        return c.trim(a).length > 0;
                }
            },
            remote: function (a, b, d) {
                if (this.optional(b)) return "dependency-mismatch";
                var e = this.previousValue(b);
                this.settings.messages[b.name] || (this.settings.messages[b.name] = {});
                e.originalMessage = this.settings.messages[b.name].remote;
                this.settings.messages[b.name].remote = e.message;
                d = (typeof d == "string" && { url: d }) || d;
                if (this.pending[b.name]) return "pending";
                if (e.old === a) return e.valid;
                e.old = a;
                var f = this;
                this.startRequest(b);
                var g = {};
                g[b.name] = a;
                c.ajax(
                    c.extend(
                        true,
                        {
                            url: d,
                            mode: "abort",
                            port: "validate" + b.name,
                            dataType: "json",
                            data: g,
                            success: function (h) {
                                f.settings.messages[b.name].remote = e.originalMessage;
                                var j = h === true;
                                if (j) {
                                    var i = f.formSubmitted;
                                    f.prepareElement(b);
                                    f.formSubmitted = i;
                                    f.successList.push(b);
                                    f.showErrors();
                                } else {
                                    i = {};
                                    h = h || f.defaultMessage(b, "remote");
                                    i[b.name] = e.message = c.isFunction(h) ? h(a) : h;
                                    f.showErrors(i);
                                }
                                e.valid = j;
                                f.stopRequest(b, j);
                            },
                        },
                        d
                    )
                );
                return "pending";
            },
            minlength: function (a, b, d) {
                return this.optional(b) || this.getLength(c.trim(a), b) >= d;
            },
            maxlength: function (a, b, d) {
                return this.optional(b) || this.getLength(c.trim(a), b) <= d;
            },
            rangelength: function (a, b, d) {
                a = this.getLength(c.trim(a), b);
                return this.optional(b) || (a >= d[0] && a <= d[1]);
            },
            min: function (a, b, d) {
                return this.optional(b) || a >= d;
            },
            max: function (a, b, d) {
                return this.optional(b) || a <= d;
            },
            range: function (a, b, d) {
                return this.optional(b) || (a >= d[0] && a <= d[1]);
            },
            email: function (a, b) {
                return (
                    this.optional(b) ||
                    /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(
                        a
                    )
                );
            },
            url: function (a, b) {
                return (
                    this.optional(b) ||
                    /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
                        a
                    )
                );
            },
            date: function (a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a));
            },
            dateISO: function (a, b) {
                return this.optional(b) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a);
            },
            number: function (a, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a);
            },
            digits: function (a, b) {
                return this.optional(b) || /^\d+$/.test(a);
            },
            creditcard: function (a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9-]+/.test(a)) return false;
                var d = 0,
                    e = 0,
                    f = false;
                a = a.replace(/\D/g, "");
                for (var g = a.length - 1; g >= 0; g--) {
                    e = a.charAt(g);
                    e = parseInt(e, 10);
                    if (f) if ((e *= 2) > 9) e -= 9;
                    d += e;
                    f = !f;
                }
                return d % 10 == 0;
            },
            accept: function (a, b, d) {
                d = typeof d == "string" ? d.replace(/,/g, "|") : "png|jpe?g|gif";
                return this.optional(b) || a.match(RegExp(".(" + d + ")$", "i"));
            },
            equalTo: function (a, b, d) {
                d = c(d)
                    .unbind(".validate-equalTo")
                    .bind("blur.validate-equalTo", function () {
                        c(b).valid();
                    });
                return a == d.val();
            },
        },
    });
    c.format = c.validator.format;
})(jQuery);
(function (c) {
    var a = {};
    if (c.ajaxPrefilter)
        c.ajaxPrefilter(function (d, e, f) {
            e = d.port;
            if (d.mode == "abort") {
                a[e] && a[e].abort();
                a[e] = f;
            }
        });
    else {
        var b = c.ajax;
        c.ajax = function (d) {
            var e = ("port" in d ? d : c.ajaxSettings).port;
            if (("mode" in d ? d : c.ajaxSettings).mode == "abort") {
                a[e] && a[e].abort();
                return (a[e] = b.apply(this, arguments));
            }
            return b.apply(this, arguments);
        };
    }
})(jQuery);
(function (c) {
    !jQuery.event.special.focusin &&
        !jQuery.event.special.focusout &&
        document.addEventListener &&
        c.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
            function d(e) {
                e = c.event.fix(e);
                e.type = b;
                return c.event.handle.call(this, e);
            }
            c.event.special[b] = {
                setup: function () {
                    this.addEventListener(a, d, true);
                },
                teardown: function () {
                    this.removeEventListener(a, d, true);
                },
                handler: function (e) {
                    arguments[0] = c.event.fix(e);
                    arguments[0].type = b;
                    return c.event.handle.apply(this, arguments);
                },
            };
        });
    c.extend(c.fn, {
        validateDelegate: function (a, b, d) {
            return this.bind(b, function (e) {
                var f = c(e.target);
                if (f.is(a)) return d.apply(f, arguments);
            });
        },
    });
})(jQuery);

/* jquery.validate.unobtrusive.min */
(function (a) {
    var d = a.validator,
        b,
        e = "unobtrusiveValidation";
    function c(a, b, c) {
        a.rules[b] = c;
        if (a.message) a.messages[b] = a.message;
    }
    function j(a) {
        return a.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g);
    }
    function f(a) {
        return a.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1");
    }
    function h(a) {
        return a.substr(0, a.lastIndexOf(".") + 1);
    }
    function g(a, b) {
        if (a.indexOf("*.") === 0) a = a.replace("*.", b);
        return a;
    }
    function m(c, e) {
        var b = a(this).find("[data-valmsg-for='" + f(e[0].name) + "']"),
            d = b.attr("data-valmsg-replace"),
            g = d ? a.parseJSON(d) !== false : null;
        b.removeClass("field-validation-valid").addClass("field-validation-error");
        c.data("unobtrusiveContainer", b);
        if (g) {
            b.empty();
            c.removeClass("input-validation-error").appendTo(b);
        } else c.hide();
    }
    function l(e, d) {
        var c = a(this).find("[data-valmsg-summary=true]"),
            b = c.find("ul");
        if (b && b.length && d.errorList.length) {
            b.empty();
            c.addClass("validation-summary-errors").removeClass("validation-summary-valid");
            a.each(d.errorList, function () {
                a("<li />").html(this.message).appendTo(b);
            });
        }
    }
    function k(d) {
        var b = d.data("unobtrusiveContainer"),
            c = b.attr("data-valmsg-replace"),
            e = c ? a.parseJSON(c) : null;
        if (b) {
            b.addClass("field-validation-valid").removeClass("field-validation-error");
            d.removeData("unobtrusiveContainer");
            e && b.empty();
        }
    }
    function n() {
        var b = a(this),
            c = "__jquery_unobtrusive_validation_form_reset";
        if (b.data(c)) return;
        b.data(c, true);
        try {
            b.data("validator").resetForm();
        } finally {
            b.removeData(c);
        }
        b.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
        b.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer");
    }
    function i(b) {
        var c = a(b),
            f = c.data(e),
            i = a.proxy(n, b),
            g = d.unobtrusive.options || {},
            h = function (e, d) {
                var c = g[e];
                c && a.isFunction(c) && c.apply(b, d);
            };
        if (!f) {
            f = {
                options: {
                    errorClass: g.errorClass || "input-validation-error",
                    errorElement: g.errorElement || "span",
                    errorPlacement: function () {
                        m.apply(b, arguments);
                        h("errorPlacement", arguments);
                    },
                    invalidHandler: function () {
                        l.apply(b, arguments);
                        h("invalidHandler", arguments);
                    },
                    messages: {},
                    rules: {},
                    success: function () {
                        k.apply(b, arguments);
                        h("success", arguments);
                    },
                },
                attachValidation: function () {
                    c.off("reset." + e, i)
                        .on("reset." + e, i)
                        .validate(this.options);
                },
                validate: function () {
                    c.validate();
                    return c.valid();
                },
            };
            c.data(e, f);
        }
        return f;
    }
    d.unobtrusive = {
        adapters: [],
        parseElement: function (b, h) {
            var d = a(b),
                f = d.parents("form")[0],
                c,
                e,
                g;
            if (!f) return;
            c = i(f);
            c.options.rules[b.name] = e = {};
            c.options.messages[b.name] = g = {};
            a.each(this.adapters, function () {
                var c = "data-val-" + this.name,
                    i = d.attr(c),
                    h = {};
                if (i !== undefined) {
                    c += "-";
                    a.each(this.params, function () {
                        h[this] = d.attr(c + this);
                    });
                    this.adapt({ element: b, form: f, message: i, params: h, rules: e, messages: g });
                }
            });
            a.extend(e, { __dummy__: true });
            !h && c.attachValidation();
        },
        parse: function (c) {
            var b = a(c),
                e = b.parents().addBack().filter("form").add(b.find("form")).has("[data-val=true]");
            b.find("[data-val=true]").each(function () {
                d.unobtrusive.parseElement(this, true);
            });
            e.each(function () {
                var a = i(this);
                a && a.attachValidation();
            });
        },
    };
    b = d.unobtrusive.adapters;
    b.add = function (c, a, b) {
        if (!b) {
            b = a;
            a = [];
        }
        this.push({ name: c, params: a, adapt: b });
        return this;
    };
    b.addBool = function (a, b) {
        return this.add(a, function (d) {
            c(d, b || a, true);
        });
    };
    b.addMinMax = function (e, g, f, a, d, b) {
        return this.add(e, [d || "min", b || "max"], function (b) {
            var e = b.params.min,
                d = b.params.max;
            if (e && d) c(b, a, [e, d]);
            else if (e) c(b, g, e);
            else d && c(b, f, d);
        });
    };
    b.addSingleVal = function (a, b, d) {
        return this.add(a, [b || "val"], function (e) {
            c(e, d || a, e.params[b]);
        });
    };
    d.addMethod("__dummy__", function () {
        return true;
    });
    d.addMethod("regex", function (b, c, d) {
        var a;
        if (this.optional(c)) return true;
        a = new RegExp(d).exec(b);
        return a && a.index === 0 && a[0].length === b.length;
    });
    d.addMethod("nonalphamin", function (c, d, b) {
        var a;
        if (b) {
            a = c.match(/\W/g);
            a = a && a.length >= b;
        }
        return a;
    });
    if (d.methods.extension) {
        b.addSingleVal("accept", "mimtype");
        b.addSingleVal("extension", "extension");
    } else b.addSingleVal("extension", "extension", "accept");
    b.addSingleVal("regex", "pattern");
    b.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
    b.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
    b.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
    b.add("equalto", ["other"], function (b) {
        var i = h(b.element.name),
            j = b.params.other,
            d = g(j, i),
            e = a(b.form)
                .find(":input")
                .filter("[name='" + f(d) + "']")[0];
        c(b, "equalTo", e);
    });
    b.add("required", function (a) {
        (a.element.tagName.toUpperCase() !== "INPUT" || a.element.type.toUpperCase() !== "CHECKBOX") && c(a, "required", true);
    });
    b.add("remote", ["url", "type", "additionalfields"], function (b) {
        var d = { url: b.params.url, type: b.params.type || "GET", data: {} },
            e = h(b.element.name);
        a.each(j(b.params.additionalfields || b.element.name), function (i, h) {
            var c = g(h, e);
            d.data[c] = function () {
                var d = a(b.form)
                    .find(":input")
                    .filter("[name='" + f(c) + "']");
                return d.is(":checkbox") ? d.filter(":checked").val() || d.filter(":hidden").val() || "" : d.is(":radio") ? d.filter(":checked").val() || "" : d.val();
            };
        });
        c(b, "remote", d);
    });
    b.add("password", ["min", "nonalphamin", "regex"], function (a) {
        a.params.min && c(a, "minlength", a.params.min);
        a.params.nonalphamin && c(a, "nonalphamin", a.params.nonalphamin);
        a.params.regex && c(a, "regex", a.params.regex);
    });
    a(function () {
        d.unobtrusive.parse(document);
    });
})(jQuery);
/* jquery.unobtrusive-ajax */
!(function (c) {
    var i = "unobtrusiveAjaxClick",
        u = "unobtrusiveAjaxClickTarget",
        o = "unobtrusiveValidation";
    function d(t, a) {
        for (var e = window, r = (t || "").split("."); e && r.length; ) e = e[r.shift()];
        return "function" == typeof e ? e : (a.push(t), Function.constructor.apply(null, a));
    }
    function s(t) {
        return "GET" === t || "POST" === t;
    }
    function l(u, t) {
        var a, n, i, o;
        ((a = u.getAttribute("data-ajax-confirm")) && !window.confirm(a)) ||
            ((n = c(u.getAttribute("data-ajax-loading"))),
            (o = parseInt(u.getAttribute("data-ajax-loading-duration"), 10) || 0),
            c.extend(t, {
                type: u.getAttribute("data-ajax-method") || void 0,
                url: u.getAttribute("data-ajax-url") || void 0,
                cache: !!u.getAttribute("data-ajax-cache"),
                beforeSend: function (t) {
                    var a, e, r;
                    return (e = t), s((r = i)) || e.setRequestHeader("X-HTTP-Method-Override", r), !1 !== (a = d(u.getAttribute("data-ajax-begin"), ["xhr"]).apply(u, arguments)) && n.show(o), a;
                },
                complete: function () {
                    n.hide(o), d(u.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(u, arguments);
                },
                success: function (t, a, e) {
                    var r, n, i;
                    (r = u),
                        (n = t),
                        -1 === (e.getResponseHeader("Content-Type") || "text/html").indexOf("application/x-javascript") &&
                            ((i = (r.getAttribute("data-ajax-mode") || "").toUpperCase()),
                            c(r.getAttribute("data-ajax-update")).each(function (t, a) {
                                var e;
                                switch (i) {
                                    case "BEFORE":
                                        (e = a.firstChild),
                                            c("<div />")
                                                .html(n)
                                                .contents()
                                                .each(function () {
                                                    a.insertBefore(this, e);
                                                });
                                        break;
                                    case "AFTER":
                                        c("<div />")
                                            .html(n)
                                            .contents()
                                            .each(function () {
                                                a.appendChild(this);
                                            });
                                        break;
                                    case "REPLACE-WITH":
                                        c(a).replaceWith(n);
                                        break;
                                    default:
                                        c(a).html(n);
                                }
                            })),
                        d(u.getAttribute("data-ajax-success"), ["data", "status", "xhr"]).apply(u, arguments);
                },
                error: function () {
                    d(u.getAttribute("data-ajax-failure"), ["xhr", "status", "error"]).apply(u, arguments);
                },
            }),
            t.data.push({ name: "X-Requested-With", value: "XMLHttpRequest" }),
            s((i = t.type.toUpperCase())) || ((t.type = "POST"), t.data.push({ name: "X-HTTP-Method-Override", value: i })),
            c.ajax(t));
    }
    c(document).on("click", "a[data-ajax=true]", function (t) {
        t.preventDefault(), l(this, { url: this.href, type: "GET", data: [] });
    }),
        c(document).on("click", "form[data-ajax=true] input[type=image]", function (t) {
            var a = t.target.name,
                e = c(t.target),
                r = c(e.parents("form")[0]),
                n = e.offset();
            r.data(i, [
                { name: a + ".x", value: Math.round(t.pageX - n.left) },
                { name: a + ".y", value: Math.round(t.pageY - n.top) },
            ]),
                setTimeout(function () {
                    r.removeData(i);
                }, 0);
        }),
        c(document).on("click", "form[data-ajax=true] :submit", function (t) {
            var a = t.currentTarget.name,
                e = c(t.target),
                r = c(e.parents("form")[0]);
            r.data(i, a ? [{ name: a, value: t.currentTarget.value }] : []),
                r.data(u, e),
                setTimeout(function () {
                    r.removeData(i), r.removeData(u);
                }, 0);
        }),
        c(document).on("submit", "form[data-ajax=true]", function (t) {
            var a,
                e = c(this).data(i) || [],
                r = c(this).data(u),
                n = r && r.hasClass("cancel");
            (t.preventDefault(), n || !(a = c(this).data(o)) || !a.validate || a.validate()) && l(this, { url: this.action, type: this.method || "GET", data: e.concat(c(this).serializeArray()) });
        });
})(jQuery);

/*! Image Map Resizer (imageMapResizer.min.js ) - v1.0.10 - 2019-04-10
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2019 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!(function () {
    "use strict";
    function r() {
        function e() {
            var r = { width: u.width / u.naturalWidth, height: u.height / u.naturalHeight },
                a = { width: parseInt(window.getComputedStyle(u, null).getPropertyValue("padding-left"), 10), height: parseInt(window.getComputedStyle(u, null).getPropertyValue("padding-top"), 10) };
            i.forEach(function (e, t) {
                var n = 0;
                o[t].coords = e
                    .split(",")
                    .map(function (e) {
                        var t = 1 == (n = 1 - n) ? "width" : "height";
                        return a[t] + Math.floor(Number(e) * r[t]);
                    })
                    .join(",");
            });
        }
        function t(e) {
            return e.coords.replace(/ *, */g, ",").replace(/ +/g, ",");
        }
        function n() {
            clearTimeout(d), (d = setTimeout(e, 250));
        }
        function r(e) {
            return document.querySelector('img[usemap="' + e + '"]');
        }
        var a = this,
            o = null,
            i = null,
            u = null,
            d = null;
        "function" != typeof a._resize
            ? ((o = a.getElementsByTagName("area")),
              (i = Array.prototype.map.call(o, t)),
              (u = r("#" + a.name) || r(a.name)),
              (a._resize = e),
              u.addEventListener("load", e, !1),
              window.addEventListener("focus", e, !1),
              window.addEventListener("resize", n, !1),
              window.addEventListener("readystatechange", e, !1),
              document.addEventListener("fullscreenchange", e, !1),
              (u.width === u.naturalWidth && u.height === u.naturalHeight) || e())
            : a._resize();
    }
    function e() {
        function t(e) {
            e &&
                (!(function (e) {
                    if (!e.tagName) throw new TypeError("Object is not a valid DOM element");
                    if ("MAP" !== e.tagName.toUpperCase()) throw new TypeError("Expected <MAP> tag, found <" + e.tagName + ">.");
                })(e),
                r.call(e),
                n.push(e));
        }
        var n;
        return function (e) {
            switch (((n = []), typeof e)) {
                case "undefined":
                case "string":
                    Array.prototype.forEach.call(document.querySelectorAll(e || "map"), t);
                    break;
                case "object":
                    t(e);
                    break;
                default:
                    throw new TypeError("Unexpected data type (" + typeof e + ").");
            }
            return n;
        };
    }
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && "object" == typeof module.exports ? (module.exports = e()) : (window.imageMapResize = e()),
        "jQuery" in window &&
            (window.jQuery.fn.imageMapResize = function () {
                return this.filter("map").each(r).end();
            });
})();
//# sourceMappingURL=imageMapResizer.map

$(document).ready(function () {
    $("map").imageMapResize();
});

if ($("#map-tbl").length) {
    $(window).on("scroll", function () {
        var elementOffset = $("#map-tbl").offset().top;
        var distance = $(window).scrollTop();
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        console.log(window.innerHeight);
        if (distance >= elementOffset - (window.innerHeight + 100)) {
            $(".float-bottom").addClass("slideDiv");
        } else {
            $(".float-bottom").removeClass("slideDiv");
        }

        if (scrollPosition > $(document).height() - 400) {
            $(".float-bottom").addClass("removeFix");
            console.log("i am at bottom of page");
        } else {
            $(".float-bottom").removeClass("removeFix");
        }
    });
}

/*CUSTOM*/
$(document).ready(function () {
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect: "elastic",
            openSpeed: 400,
            closeEffect: "elastic",
            closeSpeed: 400,
        });
    }

    if ($(".fancyboxfullwidth").length) {
        $(".fancyboxfullwidth").fancybox({
            openEffect: "elastic",
            openSpeed: 400,
            closeEffect: "elastic",
            closeSpeed: 400,
            width: "100%",
            wrapCSS: "fancyboxfullwidthpopup",
        });
    }
});

$(function () {
    $(".head_toplink .location_link .sublevel a").attr("target", "_blank");

    // $('header .humberger_icon').click(function() {
    //  $(this).parents('body').addClass('menuopen');
    //   $('.menuopen .wrapper').click(function() {
    //   $(this).parents('body').removeClass('menuopen');
    //   $(this).parents('.slide_menu').find('.level_1').animate({
    //     'left': '0%'
    //   });
    //   $(".menuopen .wrapper").unbind('click');
    // });
    // return false;
    //});
    $(".slide_menu .close_menu").click(function () {
        $(this).parents("body").removeClass("menuopen");
        $(this).parents(".slide_menu").find(".level_1").animate({
            left: "0%",
        });
    });
    $(".slide_menu li ul").prev("a").addClass("hasul");
    $(".slide_menu li a").click(function () {
        if ($(this).closest("li").children("ul").length) {
            $(this).closest("li").children("ul").show();
            $(this).parents(".level_1").animate({
                left: "-=100%",
            });
        }
    });

    $(".slide_menu .level_head a.backButton").click(function () {
        $(this).closest("ul").hide();
        $(this).parents(".level_1").animate({
            left: "+=100%",
        });
    });

    $("header .search_link > a").click(function () {
        $(this).addClass("active");
        $(this).siblings(".sublevel").slideDown();
        $("#txt_search").focus();
        return false;
    });

    $("header .location_link > a").click(function () {
        $(this).addClass("active");
        $(this).siblings(".sublevel").slideDown();
        return false;
    });

    $(document).click(function (e) {
        var target = e.target;
        if (!$(target).is("header .location_link .sublevel li") && !$(target).parents().is("header .location_link .sublevel")) {
            $("header .location_link > a").removeClass("active");
            $("header .location_link .sublevel").slideUp();
        }

        if (!$(target).is("header .search_link .sublevel li") && !$(target).parents().is("header .search_link .sublevel")) {
            $("header .search_link > a").removeClass("active");
            $("header .search_link .sublevel").slideUp();
            $("#search_res").hide();
            $("#txt_search").val("");
        }
    });

    // mobile conversion
    $(".span_select").click(function () {
        $(this).parents(".mobiledropdown").find(".options").toggleClass("openselect");
    });
    $(".mobiledropdown").on("click", ".selItem", function () {
        $(this).parents(".mobiledropdown").find(".options").toggleClass("openselect");
    });
    $(".options a").click(function () {
        $(this).parents(".mobiledropdown").find(".span_select").text("");
        if ($(this).parents(".mobiledropdown").find(".selItem").length == 1) {
            $(this).parents(".mobiledropdown").find(".selItem").remove();
        }
        $(this)
            .parents(".mobiledropdown")
            .find(".span_select")
            .after('<span class="selItem">' + $(this).text() + "</span>");
        $(this).parents(".mobiledropdown").find(".options").removeClass("openselect");
    });

    $(".performance_grid ul li").hover(
        function () {
            $(".performance_grid ul li").addClass("opaque");
            $(this).removeClass("opaque");
            $(this).find("p, .anchor_button").stop("true", "true").show(300);
        },
        function () {
            $(".performance_grid ul li").removeClass("opaque");
            $(this).find("p, .anchor_button").hide(300);
        }
    );

    //
    var breadCrumOffsetTop = $("#breadcrumb").length ? $("#breadcrumb").offset().top : null;

    if (!$(".fullpage-wrapper").length) {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $("header").addClass("smallhead");
            } else {
                $("header").removeClass("smallhead");
            }

            if ($(window).scrollTop() + $(window).height() > $(document).innerHeight() - $("footer").innerHeight()) {
                $("body").find(".up_down_arrow").removeClass("down_arrow").addClass("up_arrow");
            }

            if ($(window).scrollTop() <= $("header").height()) {
                $("body").find(".up_down_arrow").removeClass("up_arrow").addClass("down_arrow");
            }

            if ($(window).width() >= 1024) {
                if ($("#breadcrumb").length) {
                    if ($(window).scrollTop() + $("header").innerHeight() > breadCrumOffsetTop) {
                        $("#breadcrumb").addClass("sticky").css("top", $("header").innerHeight());
                        $("#breadcrumb").next().css("margin-top", $("header").innerHeight());
                    } else {
                        $("#breadcrumb").removeClass("sticky");
                        $("#breadcrumb").next().css("margin-top", "0");
                    }
                }
            }
        });
    }

    $("form .form-control")
        .focus(function () {
            $(this).parent(".form-group").addClass("start");
        })
        .blur(function () {
            $(this).parent(".form-group").removeClass("start");
        });

    $(".tabselect select").on("change", function (e) {
        $(this).closest(".tabselect").prev(".nav-tabs").children("li").children("a").eq($(this).val()).tab("show");
    });

    $(".tab-content .panel-group .panel:first").addClass("open");

    $(".tab-content .panel a").click(function () {
        if ($(this).closest(".panel").hasClass("open")) {
            $(this).closest(".panel").removeClass("open");
        } else {
            $(this).closest(".panel-group").find(".panel").removeClass("open");
            $(this).closest(".panel").addClass("open");
        }
    });

    $(".panel-group .panel:first").addClass("collapsed");

    $(".panel-group .panel a").click(function () {
        if ($(this).closest(".panel").hasClass("collapsed")) {
            $(this).closest(".panel").removeClass("collapsed");
        } else {
            $(this).closest(".panel-group").find(".panel").removeClass("collapsed");
            $(this).closest(".panel").addClass("collapsed");
        }
    });

    if ($(".banner #bx-pager a.thumblink").length) {
        $(".banner #bx-pager a.thumblink").hover(
            function () {
                $(".banner .bx-wrapper video")[0].play();
            },
            function () {
                $(".banner .bx-wrapper video")[0].pause();
            }
        );
    }

    $(".nav.nav-tabs a").click(function (e) {
        if ($(this).attr("target") != undefined) {
            window.open($(this).attr("href"), "_blank");
            return false;
        }
    });

    $(window).load(function () {
        //$('#section0 .banner .banner_caption').append('<a href="" class="go_next_section"></a>');
        $("body").append('<div class="up_down_arrow down_arrow"></div>');
    });

    /*$('#section0 .banner .banner_caption').delegate('.go_next_section','click', function(){
  	//alert('click');
  	//$('#fp-nav ul li:nth-child(2) a').trigger('click');
  	$.fn.fullpage.moveSectionDown();
  	return false;
  });*/

    var currentSlideIndex,
        totalSlideIndex = $("#fullpage .section").length - 1;

    $("body").delegate(".down_arrow", "click", function () {
        if ($(".fullpage-wrapper").length) {
            $.fn.fullpage.moveSectionDown();
            currentSlideIndex = $("#fullpage").find(".section.active").index();
            console.log(currentSlideIndex);
            if (currentSlideIndex == totalSlideIndex) {
                $("body").find(".up_down_arrow").removeClass("down_arrow").addClass("up_arrow");
            }
        } else {
            $("html, body").animate(
                {
                    scrollTop: $(window).scrollTop() + $(window).height() / 2,
                },
                1000
            );
        }

        return false;
    });

    $("body").delegate(".up_arrow", "click", function () {
        if ($(".fullpage-wrapper").length) {
            currentSlideIndex = $("#fullpage").find(".section.active").index();
            if (currentSlideIndex == 1) {
                $("body").find(".up_down_arrow").removeClass("up_arrow").addClass("down_arrow");
            }
            $.fn.fullpage.moveSectionUp();
        } else {
            $("html, body").animate(
                {
                    scrollTop: $(window).scrollTop() - $(window).height() / 2,
                },
                1000
            );
        }

        return false;
    });

    $(window).load(function () {
        if ($(window).width() < 1024) {
            if ($(".fullpage-wrapper").length) {
                if ($("#fullpage .section video").length) {
                    $("#fullpage .section video").remove();
                }
            }
        }

        var location = window.location.href;
        if (location.indexOf("#") > -1) {
            location = location.split("#");
            if ($('a[name="' + location[1] + '"]').length) {
                var hashScrollTop = $('a[name="' + location[1] + '"]').offset().top - $("header").innerHeight() - 50;
                $("html, body").animate(
                    {
                        scrollTop: hashScrollTop,
                    },
                    400
                );
            }

            return false;
        }
    });
    $(".search-button").click(function () {
        $(".search-wrapper").css({ width: "300px", opacity: "1", "border-color": "#397dde" });
        $(".search-input").css({ opacity: "1" });
    });
    $("header .humberger_icon").click(function () {
        $("body").addClass("overmenuopen");

        setTimeout(function () {
            $(".over_menu_close").addClass("open");
        }, 300);
    });
    $(".over_menu .over_level1 > li > a").click(function () {
        $(".over_menu ul").removeClass("open");
        $(".over_menu ul li").removeClass("active");
    });
    $(".over_menu .over_level1 a").click(function () {
        $(this).parent().parent().find("ul").removeClass("open");
        $(this).parent().parent().find("li").removeClass("active");
        $(this).next().addClass("open");
        $(this).parent().addClass("active");
    });
    $(".over_menu ul > li.menu_head span.back").click(function () {
        $(this).parent().parent().removeClass("open");
        $(".over_menu ul li").removeClass("active");
    });
    $(".over_menu .over_menu_close, .over_menu .over_menu_overlay").click(function () {
        $("body").removeClass("overmenuopen");
        $(".over_menu ul").removeClass("open");
        $(".over_menu ul li").removeClass("active");
        $(".over_menu_close").removeClass("open");
    });
    $(".financial-summary .financial-summary-section .row > div a").hover(
        function () {
            $(".financial-summary .financial-summary-section .row > div a").not(this).addClass("disabled");
        },
        function () {
            $(".financial-summary .financial-summary-section .row > div a").removeClass("disabled");
        }
    );
    var isMenuOpen = false;
    $(".quick_menu_btn").hover(
        function () {
            $(this).addClass("hovered");
        },
        function () {
            $(this).removeClass("hovered");
        }
    );
    $(".quick_menu .quick_menu_body .quick_menu_links").hide();
    $(".quick_menu_btn").click(function () {
        var $this = $(this);
        if (!isMenuOpen) {
            $(this).addClass("hovered");
            $("body").css("overflow", "hidden");
            $(".quick_menu_background").addClass("open");
            $(".quick_menu_open").fadeOut(75, function () {
                $(".quick_menu_close").fadeIn(75).css("display", "block");
            });
            $(".quick_menu_wrapper").addClass("rightzero");
            setTimeout(function () {
                $(".quick_menu .quick_menu_body .quick_menu_links").slideDown(300);
            }, 300);
            isMenuOpen = true;
        } else {
            $(this).removeClass("hovered");
            $("body").css("overflow", "auto");
            $(".quick_menu_background").removeClass("open");
            $(".quick_menu .quick_menu_body .quick_menu_links").slideUp(300, function () {
                $(".quick_menu_close").fadeOut(75, function () {
                    $(".quick_menu_open").fadeIn(75).css("display", "block");
                });
                $(".quick_menu_wrapper").removeClass("rightzero");
                isMenuOpen = false;
            });
        }
    });
    $(window).on("scroll", function (e) {
        if ($(window).scrollTop() >= 310) {
            $(".quick_menu .quick_menu_btn").addClass("white");
        } else {
            $(".quick_menu .quick_menu_btn").removeClass("white");
        }
    });

    function cookiesVerification() {
        if (localStorage.getItem("isCookiesClosed") == null) {
            $(".privacy-cookie-alert").addClass("go");
        }
        $(".cookies-closeBtn").click(function () {
            localStorage.setItem("isCookiesClosed", true);
            $(".privacy-cookie-alert").removeClass("go");
        });
    }
    cookiesVerification();
});
