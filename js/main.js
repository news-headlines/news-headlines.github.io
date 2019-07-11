var card = Vue.component("card", {
	props: ["article"],
	methods: {
		date() {
			return new Date(this.article.publishedAt)
		}
	},
	template: "#card"
})

var app = new Vue({
	el: "#app",
	data: {
		query: "",
		language: "ru",
		languages: ["ru", "en"],
		page: 1,
		articles: [],
		apikey: "9e55d5d601f04394bd91da411dbdf09e"
	},
	computed: {
		url() {
			return `https://newsapi.org/v2/everything?apiKey=${this.apikey}&q=${this.query}&language=${this.language}&page=${this.page}`;
		}
	},
	methods: {
		getData() {
			fetch(this.url).then(
				response => response.json()
				).then(
				data => {
					this.articles = data.articles
				}
				)
			},
			switchPage(direction, page) {
				if(page) {
					this.page = page;
					this.getData();

					return false;
				}

				this.page += direction;
				
				if(this.page < 1) {
					this.page = 1;
					return false;
				}

				if(this.page > 5) {
					this.page = 5;
					return false;
				}

				this.getData();
			}
		},
		created() {
			if(this.query) {
				this.getData();
			}
		}
	})