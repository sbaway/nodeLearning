## Stream 模块 ##

流分为可读流（*Readable*）、可写流（*Writable*）、以及可读可写流（Duplex）。所有的流都是一个`EventEmitter`对象。通过`require('stream')`来引用这个模块。

### 类：stream.Readable ###

*Readable stream*代表你正在读取的数据资源，数据从*Readable stream*中输出。它会在你发出准备好信号后开始输出数据。

*Readable stream*有两种模式：**流动模式**（flowing mode）和**停顿模式**(paused mode)。在流动模式时，数据以最快的速度被读出，在停顿模式时，必须通过调用`stream.read()`使数据包被读出。流最初是以停顿模式开始的。
 
可以通过以下方法将流切换为流动模式：

- 添加`'data'`事件句柄来监听数据。
- 调用`resume()`方法开启流动模式。
- 调用`pipe()`方法将读出的数据送到*writable stream*。

通过以下方法可以将流切换回停顿模式：

- 如果没有为流设置目的地，可以调用pause()方法。
- 如果有为流设置了目的地，可以移除'data'事件句柄，并通过`unpipe()`删除所有的流目的地。

##### 事件： 'readable' #####

当一个数据块可以从流中读取时，它会发送`'readable'`事件。

    var readable = getReadableStreamSomehow();
    readabel.on('readable', function() {
        //there is some data to read now.
    });

##### 事件： 'data' #####

- *chunk* {Buffer | String} 数据块

为一个没有开启的流添加`'data'`事件会将流的模式切换为流模式。数据会以最快的速度被读出。

如果只是想让数据以最快的速度从流中读出，以下是最好的方法：
     
    var readable = getReadableStreamSomehow();
    readable.on('data', function(chunk) {
        console.log('got %d bytes of data', chunk.length);
    });

##### 事件： 'end' #####

这个事件在没有数据可读的时候触发。

    var readable = getReadableStreamSomehow();
    readable.on('data', function(chunk) {
        console.log('got %d bytes of data', chunk.length);
    });
    readable.on('end', function() {
        console.log('there will be no more data.');
    });

##### 事件： 'close' #####

当读取的资源关闭的时候触发。不是所有的流都会触发这个事件。

##### 事件： 'error' #####

- Error Object

当接收数据出错时触发。

##### readable.read([size]) #####

- *size* {Number} 可选参数，指明要接收多少数据
- *Return* {String | Buffer | null}

`read()`方法将数据从内部缓冲区读取出来并返回。如果没有可读取的数据，就返回`null`。如果设置了`size`参数，那么就会返回相应字节长度的数据。如果没有设置`size`参数，就会返回所有内部缓冲区的数据。

这个方法只能在停顿模式下被调用，在流动模式时，这个方法会自动调用，知道内部缓冲区的数据全部读完。

这个方法返回一个数据块，并触发`'data'`事件。

##### readable.setEncoding(encoding) #####

- *encoding* {String} 运用的编码方式
- *Return* `this`

这个方法可以使流返回的数据以指定的方式编码，而不是返回Buffer对象。例如，如果设置了`readable.setEncoding('utf8')`，那么输出的数据就会被解读为UTF-8数据，从而返回一个字符串。如果设置了`readable.setEncoding('hex')`，那么返回的就会是十六进制的字符串。

##### readable.resume() #####

- *Return* `this`

这个方法会使流继续发送`'data'`事件。

这个方法会使流切换到流动模式。如果你不想读取流中的数据，但是想要得到`'end'`事件，那么就可以用`readable.resume()来`开启流动模式。

    var readable = getReadableStreamSomehow();
    readable.resume();
    readable.on('end', function(chunk) {
        console.log('got to the end, but did not read anything.');
    });

##### readable.pause() #####

- *Return* `this`

这个方法会使处于流动模式的流停止发送'data'事件，并切换到停顿模式。

    var readable = getReadableStreamSomehow();
    readable.on('data', function(chunk) {
        console.log('got %d bytes of data', chunk.length);
        readable.pause();

        console.log('there will be no more data for 1 second.');

        setTimeout(function() {
            console.log('now data will start flowing again.');
            readable.resume();
            }, 1000);
     });

##### readable.isPaused() #####

- *Return* {Boolean}

返回这个*readable stream*是否被人为设为停顿模式。

##### readable.pipe(destination[,options]) #####

- *desitination* {Writable Stream} 写数据的目的地
- *options* {Object} 可选参数
     *end* {Boolean} 数据读取完毕后是否关闭*Writable Stream*，默认值 `true`
   
这个方法将从*readable stream*中读取的数据写入到设定的目的地中，它会自动管理数据的流量。

    var readable = getReadableStreamSomehow();
    var writable = fs.createWriteStream('file.txt');
    //All the data from readable goes into 'file.txt'
    readable.pipe(writable);

这个函数会返回目标流，所以可以像下面这样连接管道：
    
    var r = fs.createReadStream('file.txt');
    var z = zlib.createGzip();
    var w = fs.createWriteStream('file.txt.gz');
    r.pipe(z).pipe(w);

##### readable.unpipe([destination]) #####

- *destination* {Writable Stream} 可选参数 解除特定流的通道

这个方法会解除上次pipe()设置的管道。如果没有指定特定的目的地流，那么将会解除所有的管道

### 类： stream.Writable ###

*Writable stream*是要将数据写入的目的地。

##### writable.write(chunk[, encoding][, callback]) #####

- *chunk* {String | Buffer} 要写入的数据
- *encoding* {String} 如果chunk是String类型，设置其编码方式
- *callback* {Function} 数据写入后的回调函数
- *Return* {Boolean} 如果数据全部写完反回`true`

这个方法向流写入数据，并在数据完全写入后调用指定的回调函数。
返回值表明你现在是否可以继续写入。如果数据要溢出到缓冲区，就会返回*false*，否则返回*true*。这个返回值是严格查询的，即使返回值是*false*也依然可以继续写入数据。但是这时写入的数据会滞留在缓存中，所以最好不要过分地这样做。应该等待`drain`事件触发后再继续写入数据。

##### 事件： 'drain' #####

如果`writable.write(chunk)`返回了*false*，那么`drain`事件就指明了什么时候才可以继续写入数据。

##### writable.cork() #####

强制滞留所有写入的数据。滞留的数据会在调用`.uncork()`或`.end()`时重新启用。

##### writable.uncork() #####

写入所有的数据，直到调用`.cork()`。

##### writable.setDefaultEncoding(encoding) #####

- *encoding* {String} 新的默认编码
- *Return* {Boolean}

为*writable stream*设置默认编码方式。如果编码方式设置成功返回*true*,否则返回*false*。

##### writable.end([chunk][, encoding][, callback]) #####

- *chunk* {String | Buffer} 可选参数，要写入的数据
- *encoding* {String} 如果*chunk*是*String*类型，设置编码方式
- *callback* {Function} 可选参数，当流写完后的回调函数

当所有数据都写入完成后调用这个函数。如果设置了回调函数，那么函数会绑定在`finish`事件上。

##### 事件： 'finish' #####

当调用了end()方法，并且所有数据都已经写入完成时会发送这个事件。

    var writer = getWritableStreamSomehow();
    for(var i=0; i< 100; i++) {
        writer.write('hello, #' + i + '!\n');
    }
    writer.end('this is the end\n');
    writer.on('finish', function() {
        console.log('all writes are now complete.');
    });

##### 事件： 'pipe' #####

- *src* {Readable Stream} 绑定到这个*writable stream*上的流。

当一个*readable stream*上调用pipe()方法并把这个*writable stream*作为它的目的地时，这个事件触发。

##### 事件： 'unpipe' #####

- *src* {Readable Stream} 解除绑定到这个*writable stream*上的流。

当一个*readable stream*上调用unpipe()方法并把这个*writable stream*作为它的目的地时，这个事件触发。

##### 事件： 'error' #####

- *error* {Object}

当写入或链接数据发生错误时发送这个事件。

### 类： stream.Duplex ###

*Duplex stream*包含了*Readable stream*和*Writable stream*的接口。

### 类： stream.Transform ###

*Transform stream*是输出由输入计算得来的*Duplex stream*,它同样包含了*Readable stream*和*Writable stream*的接口。
