const pos = require('./index.js');
pos.unset('noun');
let obj = pos.spin('If your dog is out of control, another good way to correct the behavior is to isolate them from the rest of the "pack". Put them in their crate or kennel and ignore them. Isolation from the pack is dog language for "your behavior is unacceptable and we don\'t like it." Your dog will understand the message. They may whine and howl, but you have to ignore it. Think of it as a "time out" for your dog. When they are quiet and settled, let them out of the crate. Don’t forget to keep your dog exercised to help manage their energy level. Playing “fetch” is a great way to get the dog tired.')
console.log(obj);
