<template>
    <div>
        <div class="select" ref="select">
            <label class="form__label" :data-filled="Boolean(value)">{{ label }}</label>
            <div class="select__button" :id="id" @click="active = true" @focus="focus" tabindex="0">{{ selected }}</div>
            <span class="material-icons select__caret" aria-hidden="true">unfold_more</span>
            <transition name="fadeIn">
                <ul class="select__ul" v-if="active">
                    <li :class="['select__li', (value === item._id) ? 'select__li--active' : '']" v-for="item in items" :key="item._id" :id="item._id" @click="change(item._id, item.name)">{{ item.name }}</li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String
            },
            id: {
                type: String
            },
            items: {
                type: Array
            },
            value: {
                default: null
            },
        },
        data() {
            return {
                active: false,
            }
        },
        computed: {
            selected() {
                const selected = this.items.filter(item => item._id === this.value)[0];
                return (selected) ? selected.name : '';
            }
        },
        created() {
            document.addEventListener('click', this.documentClick);
        },
        destroyed() {
            document.removeEventListener('click', this.documentClick);
        },
        methods: {
            change(id) {
                this.active = false;
                this.$emit('change', id);
            },
            documentClick(e) {
                const select = this.$refs.select;
                if (select !== e.target && !select.contains(e.target)) {
                    this.active = false
                }
            },
            focus() {
                this.active = true;
            }
        }
    }
</script>