<template>
    <article class="panel">
        <div class="panel-header article-header">
            <h2>
                <span class="top" v-if="topic.top">置顶</span>
                <span class="top" v-else v-if="topic.good">精华</span>
            </h2>
            <div class="info">
                <span>发布于{{topic.create_at | timeToNow}}</span>
                <span>作者{{topic.author.loginname}}</span>
                <span>{{topic.visit_count}}次浏览</span>
                <span>来自 {{topic.tab | transTab}}</span>
                <template v-if="token">
                    <a href="#" class="btn btn-success" v-if="!inCollection" @click.prevent.stop="collect">收藏</a>
                    <a href="#" class="btn btn-failure" v-else @click.prevent.stop="deCollect">取消收藏</a>
                </template>
            </div>
        </div>
        <div class="inner padding">
            <div class="markdown-body">
                {{{topic.content}}}
            </div>
        </div>
    </article>
</template>

<script>
    import { getTopic, getCollectStatus, getToken } from '../vuex/getters';
    import { addCollection, changeCollectStatus, deCollection, fetchCollection } from '../vuex/actions';

    export default{
        vuex:{
            getters:{
                topic:getTopic,
                inCollection:getCollectStatus,
                token:getToken
            },
            actions:{
                addCollection,
                changeCollectStatus,
                deCollection,
                fetchCollection
            }
        },
        methods:{
            collect(){
                this.addCollection(this.topic.id,this.token)
                    .then(this.changeCollectStatus(true));
            },
            deCollect(){
                this.deCollection(this.topic.id,this.token)
                    .then(this.changeCollectStatus(false));
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/lib/github-markdown.css';
    .article-header{
        background-color: #fff;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 15px;
    }
    .info{
        color:#838383;
        font-size: 12px;
        span{
            &:before{
                content:'•';
            }
        }
        a{
            color:#fff;
            margin:5px 0;
            &:hover{
                color:#fff;
            }
        }
    }
    .btn-failure{
        background-color: #909090;
        color:#000;
    }
    .markdown-body{
        padding:0 15px;
        img{
            max-width: 100%;
            width: auto;
            height: auto;
        }
    }
</style>
