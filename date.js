//jshint esversion:6
<<<<<<< HEAD
exports.getDate =function (){
    const today=new Date();
    const options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    let day=today.toLocaleDateString("en-US", options);
    return day; 
}
exports.getDay= function (){
    const today=new Date();
    const options={
        weekday:"long"
    };
    let day=today.toLocaleDateString("en-US",options);
    return day;
}
console.log(exports);
=======

exports.getDate = function() {

  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US", options);

};

exports.getDay = function () {

  const today = new Date();

  const options = {
    weekday: "long"
  };

  return today.toLocaleDateString("en-US", options);

};
>>>>>>> b2d56a3 (Initial commit)
