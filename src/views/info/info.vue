<template>
    <article
        ref="article"
        class="wizard__article wizard__article--active sw-info"
    >
        <h2 class="sw-info__title" v-html="`Info of ${model.name}`"></h2>
        <ul class="sw-info__list">
            <template v-if="type === 'people'">
                <li class="sw-info__item">
                    <span class="sw-info__text">Name:</span>
                    <span class="sw-info__text" v-html="model.name"></span>
                </li>
                <li class="sw-info__item">
                    <span class="sw-info__text">Height:</span>
                    <span class="sw-info__text" v-html="model.height"></span>
                </li>
                <li class="sw-info__item">
                    <span class="sw-info__text">Mass:</span>
                    <span class="sw-info__text" v-html="model.mass"></span>
                </li>
                <li class="sw-info__item">
                    <span class="sw-info__text">Gender:</span>
                    <span class="sw-info__text" v-html="model.gender"></span>
                </li>
            </template>
            <template v-if="type === 'planets'">
                <li class="sw-info__item">
                    <span class="sw-info__text">Name:</span>
                    <span class="sw-info__text" v-html="model.name"></span>
                </li>
                <li class="sw-info__item">
                    <span class="sw-info__text">Diameter:</span>
                    <span class="sw-info__text" v-html="model.diameter"></span>
                </li>
                <li class="sw-info__item">
                    <span class="sw-info__text">Gravity:</span>
                    <span class="sw-info__text" v-html="model.gravity"></span>
                </li>
                <li class="sw-info__item">
                    <span class="sw-info__text">Terrain:</span>
                    <span class="sw-info__text" v-html="model.terrain"></span>
                </li>
            </template>

            <template v-if="type === 'starships'">
                <li class="sw-info__item">
                    <span class="sw-info__text">Name:</span>
                    <span class="sw-info__text" v-html="model.name"></span>
                </li>
                <li class="sw-info__item">
                    <span class="sw-info__text">Hyperdrive Rating:</span>
                    <span
                        class="sw-info__text"
                        v-html="model.hyperdrive_rating"
                    ></span>
                </li>
                <li class="sw-info__item">
                    <span class="sw-info__text">Length:</span>
                    <span class="sw-info__text" v-html="model.length"></span>
                </li>
                <li class="sw-info__item">
                    <span class="sw-info__text">Max Atmosphering Speed:</span>
                    <span
                        class="sw-info__text"
                        v-html="model.max_atmosphering_speed"
                    ></span>
                </li>
            </template>
        </ul>
        <div class="sw-info__content">
            <a
                href="#"
                title="Go to home"
                class="sw-info__link"
                @click.prevent="goHome()"
                >Go to home</a
            >
        </div>
    </article>
</template>
<script src="./info.ts"></script>
<style src="./info.scss" scoped></style>
