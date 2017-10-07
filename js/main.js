;(function(){
    'use strict';

    new Vue({
        el:'#main',
        data:{
            list:[],
            current:{},
            id_count:0
        },
        mounted:function(){
            this.list = ms.get('list')||this.list;
            this.id_count = ms.get('id_count')||this.id_count;
        },
        methods:{
            merge:function(){
                var is_update = this.current.id;
                if (is_update) {
                    var index = this.find_index(is_update);
                    Vue.set(this.list,index,Object.assign({},this.current))
                    // this.list[index] = Object.assign({},this.current);
                }else{
                    var title = this.current.title;
                    if (!title&&title!==0) {
                        return;
                    };
                    var todo = Object.assign({},this.current);
                    todo.id = this.next_id();
                    this.list.push(todo);
                    ms.set('id_count',this.id_count);
                };
                ms.set('list',this.list);
                this.reset_current();
                console.log(this.list);
            },

            remove:function(id){
                var index = this.find_index(id);
                this.list.splice(index,1);
                ms.set('list',this.list);
            },

            next_id: function(){
                // return this.list.length + 1;
                return this.id_count += 1;
            },

            set_current: function(item){
                this.current = Object.assign({},item);
            },

            reset_current: function(){
                this.set_current({});
            },
            
            find_index: function(id){
                return this.list.findIndex(function(item){
                    return item.id == id
                })
            },

            toggle_complete: function(id){
                var i = this.find_index(id);
                console.log(this.list[i].completed)
                Vue.set(this.list[i],'completed',!this.list[i].completed);
                ms.set('list',this.list);
                // this.list[i].complete = !this.list[i].complete;
            },

            // toggle_complete2: function(id){
            //     var i = this.find_index(id);
            //     Vue.set(this.list[i],'completed',false);
            //     ms.set('list',this.list);
            //     // this.list[i].complete = !this.list[i].complete;
            // },
        }
    })
})();