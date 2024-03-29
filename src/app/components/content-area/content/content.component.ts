import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PlaylistService } from '../../../services/playlist.service';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent {

  intro = "This is a iTunes api based project, where you can search for artists and songs and add to a playlist and then save that playlist. When in the playlist view the user can also link out to the iTunes store.";

  public data = '';
  public apiData: any;
  public results = [];
  public loading = false;
  public noData: any;
  clicked = false;
  imageLoader = true;

  p: number = 1;
  faSearch = faSearch;
  faRedo = faRedo;
  faHeadphones = faHeadphones;
  faExternalLinkAlt = faExternalLinkAlt;
  faPlus = faPlus;
  searchQuery: string = "";
  clickMessage = '';

  constructor(
    private api: ApiService,
    private list: PlaylistService
  ) { }

  getAll() {
    this.data = '';
    this.loading = true;
    this.api.getAll(this.searchQuery).subscribe((results) => {
      //console.log('Data is received - Result - ', results);
      console.log('Data is received');
      this.data = results.results;
      this.loading = false;
      if (this.data.length == 0) {
        this.noData = true;
      } else if (this.data.length) {
        this.noData = false;
      } else {
        this.noData = false;
      }
    })
  }

  closeAlert() {
    this.noData = false;
  }

  addSongToPlaylist(itunes) {
    this.list.playlist.push(Object.assign({}, itunes));
    this.list.savePlaylist();
    console.log('Playlist - ', this.list.playlist);
  }

  refresh(): void {
    window.location.reload();
  }

  Search() {
    this.api.getAll(this.searchQuery).subscribe((results) => {
      this.loading = true;
      //console.log('Data is received - Result - ', results);
      console.log('Data is received');
      this.data = results.results;
      this.loading = false;
    })
  }

  ngOnInit() {
    this.list.getPlaylist();
  }
}