import { Component, Inject, Vue } from 'vue-property-decorator';
import { CurrentPage } from 'Project/components/common/baselayout/base.vm';
import { getData } from 'Project/api/starwars.api';

@Component
export default class List extends Vue {
    @Inject()
    currentPage: CurrentPage;

    model: Array<Object> = [];
    articleElement: HTMLElement;

    param: string = '';

    constructor() {
        super();
    }

    mounted() {
        this.articleElement = this.$refs.article as HTMLElement;
        this.param = this.$route.params.id;

        getData(this.param).then(
            (data) => {
                if (data.results) {
                    this.model = data.results;
                } else {
                    this.currentPage.index = 0;
                }
            },
            (error: Error) => {
                this.currentPage.index = 0;
            }
        ).finally(() => this.$store.dispatch('setShowLoader', false))
    }

    selectItem(item: any) {
        this.$store.dispatch('setShowLoader', true);
        this.articleElement.classList.add('wizard__article--hide');
        setTimeout(() => {
            this.$router.push({ name: 'Info', params: { item: item, type:this.param } }).catch(() => { });
            this.currentPage.index = 2;
        }, 1000);
    }

}
