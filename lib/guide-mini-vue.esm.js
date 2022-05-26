function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children,
        el: null
    };
    return vnode;
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

function initProps(inistance, rawProps) {
    //props
    inistance.props = rawProps;
}

var publicPropertiesMap = {
    $el: function (i) { return i.vnode.el; },
    $slots: function (i) { return i.slots; }
};
var PublicInstanceProxyHandlers = {
    get: function (_a, key) {
        var instance = _a.instance;
        var setupState = instance.setupState, props = instance.props;
        if (key in setupState) {
            return setupState[key];
        }
        var hasOwn = function (val, key) { return Object.prototype.hasOwnProperty.call(val, key); };
        if (hasOwn(setupState, key)) {
            return setupState[key];
        }
        else if (hasOwn(props, key)) {
            return props[key];
        }
        var publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    }
};

function emit(instacne, event) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    console.log('emit', event);
    var props = instacne.props;
    //TPP开发思想 先写一个特定的行为 重构成通用的行为
    //add-foo 变成 addFoo
    var camelize = function (str) {
        return str.replace(/-(\w)/g, function (_, c) {
            return c ? c.toLocaleLowerCase() : '';
        });
    };
    var capitalize = function (str) {
        return str.charAt(0).toLocaleLowerCase() + str.slice(1);
    };
    var toHandlerKey = function (str) {
        return str ? 'on' + capitalize(event) : '';
    };
    var handlerName = toHandlerKey(camelize(event));
    var handler = props[handlerName];
    handler && handler.apply(void 0, args);
}

function initSlots(inistance, childrn) {
    var slots = {};
    var _loop_1 = function (key) {
        var value = childrn[key];
        slots[key] = function (props) { return normalizeSlotValeue(value(props)); };
    };
    for (var key in childrn) {
        _loop_1(key);
    }
    inistance.slots = slots;
}
function normalizeSlotValeue(value) {
    return Array.isArray(value) ? value : [value];
}

function createComponentInstance(vnode, parent) {
    var component = {
        vnode: vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        emit: function () { },
        slots: {},
        provides: parent ? parent.provides : {},
        parent: {}
    };
    component.emit = emit.bind(null, component);
    return component;
}
function setupComponent(instance) {
    //初始化 props
    initProps(instance, instance.vnode.props);
    //初始化插槽
    initSlots(instance, instance.vnode.children);
    //处理setup的返回值
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    var Component = instance.type;
    //代理对象
    instance.proxy = new Proxy({ instance: instance }, PublicInstanceProxyHandlers);
    //拿到setup
    var setup = Component.setup;
    if (setup) {
        var setupResult = setup(instance.props, {
            emit: instance.emit
        });
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    //function object
    //处理函数
    if (typeof setupResult == 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    var Component = instance.type;
    if (Component.render) {
        instance.render = Component.render;
    }
}

function creatAppApi(render) {
    return function createApp(rootComponent) {
        return {
            mount: function (rootContainer) {
                // 先转化成虚拟节点（vnode)
                //把组件（compontent）转化成虚拟节点（v node）
                //所有的逻辑操作都会基于这个虚拟节点（v node）做处理
                var vnode = createVNode(rootComponent);
                render(vnode, rootContainer);
            }
        };
    };
}

function createRenderer(option) {
    var createElement = option.createElement, pathProp = option.pathProp, insert = option.insert;
    function render(vnode, container, parentComponent) {
        //path (方便递归处理)
        //
        path(vnode, container, parentComponent);
        function path(vnode, container, parentComponent) {
            //判断是不是元素类型(element)
            //处理组件 如何区分element还是component 类型
            if (vnode.type == 'string') {
                processElement(vnode, container);
            }
            else if (vnode.tyoe == 'object') {
                processComponent(vnode, container, parentComponent);
            }
        }
        function processElement(vnode, container) {
            mountElement(vnode, container);
        }
        function mountElement(vnode, container) {
            var el = vnode.el = createElement(vnode.type); //document.createElement(vnode.type);
            var children = vnode.children, props = vnode.props;
            //处理children
            if (typeof children == 'string') {
                el.textContent = children;
            }
            else if (Array.isArray(children)) {
                mountChidren(vnode, el);
            }
            for (var key in props) {
                var val = props[key];
                // const isOn=(key:string)=>/^on[A-Z]/.test(key);
                // if(isOn(key)){
                //   const event=key.slice(2).toLocaleLowerCase();
                //   el.addEventListener(event,key)
                // }else{
                //   el.setAtteribute(key,val)
                // }
                pathProp(el, key, val);
            }
            // container.append(el)
            insert(el, container);
        }
        function processComponent(vnode, container, parentComponent) {
            //挂载组件
            mountComponent(vnode, container, parentComponent);
        }
        function mountComponent(vnode, container, parentComponent) {
            //创建组件实例对象
            var instance = createComponentInstance(vnode, parentComponent);
            //调用setup
            setupComponent(instance);
            //调用render
            setuoRenderEffect(instance, container, vnode);
        }
        function setuoRenderEffect(instance, container, vnode) {
            //虚拟节点树（vnode 元素类型  mountElement）path 
            var proxy = instance.proxy;
            var subTree = instance.render.call(proxy);
            path(subTree, container, instance);
            vnode.el = subTree.el;
        }
        function mountChidren(vnode, container) {
            vnode.children.forEach(function (v) {
                path(v, container, '');
            });
        }
    }
    return {
        creatApp: creatAppApi(render)
    };
}

export { createRenderer, h };
