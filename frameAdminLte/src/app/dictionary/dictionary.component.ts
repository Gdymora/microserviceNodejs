import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'; 
import { IDictionary } from './interfaces/dictionary-post.interface';
import { DictionaryService } from './services/dictionary.service';

@Component({
  selector: 'english-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  cards: IDictionary[] = [];
  dictionaryPost: IDictionary[] | undefined;
  flippedCards: IDictionary[] = [];
  winner = false;
  matchedCount = 0;
  id = 'dictionary';
  private subscription: Subscription;
  private subscription1!: Subscription;

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private dictionaryService: DictionaryService,
    private dialog: MatDialog
  ) {
    this.subscription = activateRoute.params.subscribe(
      params => this.id = params['id']
    );

  }

  ngOnInit(): void {
    console.log(this.id)
    this.subscription1 = this.dictionaryService.get(this.id).subscribe((data: IDictionary[]) => {
      this.dictionaryPost = data;
      this.setupCards(this.dictionaryPost);
      console.log(this.dictionaryPost)
    })
  }

  setupCards(dataSource: IDictionary[] | undefined): void {
    if (!dataSource) {
      return;
    }
    this.cards = [];
    dataSource.forEach((data: IDictionary, index) => {
      let cardData: IDictionary = {
        id: data.id,
        word: data.word,
        translate: data.translate,
        imageId: index,
        transcription: data.transcription,
        partsOfspech: data.partsOfspech,
        state: 'default',
      };
      this.cards.push({ ...cardData });
    });

    this.cards = this.shuffleArray(this.cards);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];
    if (cardInfo.state === 'default') {
      cardInfo.state = 'flipped';

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
    }

    setTimeout(() => {
      if (cardInfo.state === 'flipped') {
        cardInfo.state = 'default';
      }
    }, 3000);
  }

  deleteClicked(index: number): void {
    this.checkForCardMatch(this.cards[index]);
    this.cards.splice(index, 1);
    if (this.cards.length === 0) {
      this.winner = true;
    }
  }

  checkForCardMatch(card: IDictionary): void {
    setTimeout(() => {
      card.state = 'matched';
      this.matchedCount++;
    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.winner = false;
    this.setupCards(this.dictionaryPost);
  }

}
