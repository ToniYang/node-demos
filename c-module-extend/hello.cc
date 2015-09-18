#include <node.h>
#include <hello.h>
#include <v8.h>

namespace node{

// 引入v8命名空间
using namespace v8;

// sayHello方法的具体逻辑
Handle<Value> SayHello(const internal::Arguments& args) {
    HandleScope scope;
    // 返回一个"Hello World!"字符串
    return scope.Close(String::New("Hello World!"));
}

// 初始化模块
void init_hello(Handle<Object> target) {　
    // 定义模块中的sayHello方法
    target->Set(String::NewSymbol("sayHello"),FunctionTemplate::New(SayHello)->GetFunction());
}

}



// 定义"hello"模块
NODE_MODULE(hello, node::init_hello);