## react dnd
Drag and Drop for react

### 可以划分为4部分
1、 需要为实现拖拽须臾区域包裹 DragDropContext 装饰器，拖动源以及防治目标都在区域内。
```
DragDropContext(Component)(HTML5Backend)
```
2、需要为拖动源包裹一层DragSource,被DragSource装饰的组件便是可以拖放的组件。
```
DragSource(Component)(ItemProps.INPUT, knightSource, collect)
```
需要为拖动源组件指定类型，以便拖放到放置目标上识别；提供了 canDrag()/是否能拖动， isDragging()/拖动操作是否正在进行，包括类型，偏移量等等拖动源、放置目标暴露出的的属性和方法

3、也需要为放置目标包裹一层 DropTarget函数，被 DropTarget 包裹的组件为放置目标组件。
```
DropTarget(Component)(ItemTypes.COMPONENTS, squareTarget, collect)

```
需要为放置目标指定拖动源的类型，可以获取拖动源落下事件、进入放置目标事件等等，以及拖动源的相关的属性获取。

4、需要创建一个监视函数配置，当在处理拖动源、放置目标逻辑的时候，从而去刷新拖动区域的状态。
<br/>
<br/>
——————————————————————————————

### 
对拖拽区域设置一个全局对象，在这个对象中，决定了放置目标可放置拖拽源的类型和数量，以及每个拖拽源的详
情，在渲染的时候，从全局对象中可以拿到渲染的数据。

#### 参考文档
http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html