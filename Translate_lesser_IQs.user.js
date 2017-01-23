// ==UserScript==
// @name        Translate lesser IQs
// @namespace   joshleblanc94@gmail.com
// @description Makes idiots understandable
// @include     http://chat.stackoverflow.com/rooms/*
// @version     1
// @grant       none
// ==/UserScript==


class Watcher {
	constructor(el) {
		new MutationObserver(this.onMutation.bind(this)).observe(el, {
			childList: true,
			subtree: true
		});
	} 

	mapcat(a, fn) {
		return [...a].reduce((p, c) => [...p].concat(...fn(c)), fn(a[0]), 0);
	}

	isUserContainer(node) {
		var classList = node.classList || false;
		if(classList) {
			return [...node.classList].includes("user-container");
		} else {
			return false;
		}
	}	

	fixText(t) {
		var subs = {
			thx: "thanks",
			u: "you",
			omg: "oh my god",
			wtf: "what the fuck",
			bbq: "barbeque",
			ur: "your", 
			btw: "by the way",
			k: "okay",
			cuz: "because",
			coz: "because",
			r: "are",
			afaik: "as far as I know",
			iirc: "if I recall correctly",
			bcoz: "because",
			i: "I",
			pls: "please",
			plz: "please",
			b4: "before",
		}
		var words = t.split(' ').map(c => c.trim());
		words.map(w => w.trim());
		Object.keys(subs).forEach(key => {
			var i = words.indexOf(key);
			if(i > -1) {
				words[i] = subs[key];
			}
		});
		return words.join(' ');
	}

	onMutation(mutations) {
		const addedNodes = this.mapcat(mutations, m => [...m.addedNodes].filter(this.isUserContainer));
		addedNodes.forEach(n => {
			var messages = n.querySelectorAll(".message");
			[...messages].forEach(m => {
				var text = m.textContent.toLowerCase();
				m.textContent = this.fixText(text);
			});

		});
	}
}
new Watcher(chat);
