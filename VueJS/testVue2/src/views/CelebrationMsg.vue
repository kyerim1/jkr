<!--  CelebrationMsg.vue  -  로그인 하지 않으면 못들어와! -->

<template>
    <div class="MsgBoard">

        축하메시지 목록과 작성과 수정과 삭제 가 되는 페이지입니다.
        {{ id }}
    </div>
</template>

<script>

const id = this.$session.get('user_id')
    export default{
        name:'CelebrationMsg',

        data(){
            return { id }
        }
    }
</script>

<style>

</style>