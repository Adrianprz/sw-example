import { Component, Inject, Vue } from 'vue-property-decorator';
import { CurrentPage } from 'Project/components/common/baselayout/base.vm';

@Component
export default class Info extends Vue {
    @Inject()
    currentPage: CurrentPage;

    model: Object = {};
    articleElement: HTMLElement;

    type: string = '';

    constructor() {
        super();
    }

    mounted() {
        const {item,type} = this.$route.params;
        this.$store.dispatch('setShowLoader', false);
        this.articleElement = this.$refs.article as HTMLElement;
        if (!item || !type) {
            this.currentPage.index = 1;
            this.$router.push({ name: 'Categories' },).catch(() => { });
        } else {
            this.model = item;
            this.type = type;
        }
    }

    goHome() {
        this.currentPage.index = 0;
        this.$router.push({ name: 'Categories' },).catch(() => { });
    }
}
