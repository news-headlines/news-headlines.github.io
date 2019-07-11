var card = Vue.component("card", {
	props: ["article"],
	data() {
		return {
			apikey: "trnsl.1.1.20190711T181144Z.83f69bf0a5336417.79898776f9154e536e9d2e8db6f863c1e2036bd1",
			lang: "ru",
			format: "html",
			isPreloader: false
		}
	},
	computed: {
		url() {
			return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.apikey}&format=${this.format}&lang=${this.lang}&text=${this.article.title}&text=${this.article.description}`
		}
	},
	methods: {
		date() {
			return new Date(this.article.publishedAt)
		},
		getTranslated() {
			this.isPreloader = true;

			fetch(this.url).then(
					response => response.json()
				).then(
					data => {
						this.article.title = data.text[0];
						this.article.description = data.text[1];
						this.isPreloader = false;
					}
				).catch(
					error => {
						this.isPreloader = false;
					}
				)
		}
	},
	template: "#card"
})

var app = new Vue({
	el: "#app",
	data: {
		query: "",
		language: "ru",
		languages: ["ru", "en", "ar", "de", "es", "fr", "he" ,"it" ,"nl" ,"no" ,"pt" ,"se", "ud", "zh"],
		articlesNotFound: false,
		page: 1,
		articles: [],
		isPreloader: true,
		apikey: "9e55d5d601f04394bd91da411dbdf09e"
	},
	computed: {
		url() {
			return `https://newsapi.org/v2/everything?apiKey=${this.apikey}&q=${this.query}&language=${this.language}&page=${this.page}`;
		}
	},
	watch: {
		query() {
			this.articlesNotFound = false;
		}
	},
	methods: {
		resetPage() {
			this.page = 1;
		},
		getData() {
			this.isPreloader = true;
			this.articles = [];
			this.articlesNotFound = false;

			fetch(this.url).then(
					response => response.json()
				).then(
					data => {
						this.articles = data.articles
						this.isPreloader = false;
						
					}
				).catch(
					error => {
						this.isPreloader = false;
						this.articlesNotFound = true;
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
			this.isPreloader = false;
		}
	})