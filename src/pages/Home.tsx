import Button from '../components/Button';
import { FlexContainer } from '../containers';
import { redirectToSpotifyAuthorization } from '../services/authService';

export default function Home() {
  return (
    <FlexContainer className="full-height">
      <h2 className="title text--display">
        View your most played artists.{' '}
        <span className="text--green">With style.</span>
      </h2>
      <Button
        className="tw-mt-8"
        max_width="180px"
        type="button"
        onClick={redirectToSpotifyAuthorization}
      >
        Dive in
      </Button>
    </FlexContainer>
  );
}
