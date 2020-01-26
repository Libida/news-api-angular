import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  articles=[
    {
      "source": {
        "id": "engadget",
        "name": "Engadget"
      },
      "author": "Billy Steele",
      "title": "How Weber used decades of expertise to improve smart grilling",
      "description": "The Weber Kettle is arguably the most iconic grill of all time. There are other companies that have made a name for themselves with novel designs and features. But when you think about charcoal grills, I'll bet the kettle shape Weber pioneered comes to mind. …",
      "url": "https://www.engadget.com/2020/01/24/weber-smokefire-weber-connect-behind-the-scenes/",
      "urlToImage": "https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fresize%3D2000%252C2000%252Cshrink%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2020-01%252Fa65f73e0-3de5-11ea-adff-1ca355fd96c6%26client%3Da1acac3e1b3290917d92%26signature%3Deefdcb4ca684de27599ab00b129432c3f7712db7&client=amp-blogside-v2&signature=7f5107eaba38b5a37b5f4da10290009e5124c07f",
      "publishedAt": "2020-01-24T14:00:00Z",
      "content": "Weber is admittedly a late entry into the pellet-grill game. It did its homework, however, and rather than simply put out a line of pellet grills with the Weber logo on them, it brought its wealth of grill knowledge to the table. It also listened to pellet-gr… [+4591 chars]"
    },
    {
      "source": {
        "id": "wired",
        "name": "Wired"
      },
      "author": "Jason Parham",
      "title": "The Strange, Subtle Matter of ASMR Erotica",
      "description": "Although many fans and creators claim the appeal isn't sexual, much of the genre flirts with intimacy. Close your eyes—and open up.",
      "url": "https://www.wired.com/story/asmr-erotica/",
      "urlToImage": "https://media.wired.com/photos/5e2a01873216e90009e412e4/191:100/w_1280,c_limit/Cul-lips-511583298.jpg",
      "publishedAt": "2020-01-24T12:00:00Z",
      "content": "There are exceptions. An ASMRtist called Eduardo is popular among both women and gay men. His videos range from all types of role play, including Naughty boyfriend, Shirtless boyfriend, Spanish boyfriend, Male burglar, and Hot Farting Stud With Bloated Gut. (… [+3919 chars]"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
