type UserData = {
  country: string;
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

type TopItems = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Artist[] | Track[];
};

type Artist = {
  external_urls: { [url: string]: string }; //
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string; //
  id: string; //
  images: Image[];
  name: string; //
  popularity: number;
  type: 'artist'; //
  uri: string; //
};

type SimplifiedArtist = Omit<
  Artist,
  'followers' | 'genres' | 'images' | 'popularity'
>;

type Track = {
  album: Album;
  artists: SimplifiedArtist;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: {
    [url: string]: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: Track;
  restrictions?: Restriction;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
};

type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restrictions?: Restriction;
  type: string;
  uri: string;
  artists: SimplifiedArtist[];
};

type Restriction = {
  reason: 'market' | 'product' | 'explicit';
};

type Image = {
  url: string;
  height: number;
  width: number;
};

type AccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

type Breakpoint = {
  minWidth?: string;
  maxWidth?: string;
};
