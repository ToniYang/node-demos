#include <node.h>
#include <v8.h>

// 引入v8命名空间
using namespace v8;

static Isolate *globalIsolate = Isolate::GetCurrent();

// sayHello方法的具体逻辑
Handle<Value> SayHello(const FunctionCallbackInfo<Value> &args) {
    HandleScope scope(globalIsolate);
    // 返回一个"Hello World!"字符串
    return scope.CreateHandle(globalIsolate,String::NewFromUtf8(globalIsolate,"Hello World!"));
}

// 初始化模块
void init_hello(Handle<Object> target) {　
    // 定义模块中的sayHello方法
    target->Set(String::NewFromUtf8(globalIsolate,"sayHello"),FunctionTemplate::New(globalIsolate,SayHello)); // 将函数公开给js使用
}




// 定义"hello"模块
NODE_MODULE(hello, init_hello);