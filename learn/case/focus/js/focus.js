for(var i = 1; i < 10; ++i) {
  document.writeln("<li><img src='./images/" + i + ".jpg'/></li>");
  if(i % 3 == 0) {
    document.writeln("<br />")
  }
}
