import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiFillPlusCircle,
  AiOutlinePlusCircle,
  AiFillMinusCircle
  // AiOutlineMinusCircle
} from 'react-icons/ai';

import { RootState } from '../../store';
import { setCollapseLessPlayedGenres } from '../../store/miscSlice';
import * as S from './ChartStyle';

type Props = {
  color: string;
};

export default function OtherGenresButton(props: Props) {
  const [highlightIcon, setHighlightIcon] = useState<boolean>(false);

  const dispatch = useDispatch();

  const collapse = useSelector(
    (state: RootState) => state.misc.chart.collapseLessPlayedGenres
  );

  const handleClick = () => {
    dispatch(setCollapseLessPlayedGenres(!collapse));
  };

  const displayButton = (props: Props) => {
    if (!collapse) return <AiFillMinusCircle {...props} />;
    return (
      <>
        {highlightIcon ? (
          <AiFillPlusCircle {...props} />
        ) : (
          <AiOutlinePlusCircle {...props} />
        )}
      </>
    );
  };

  return (
    <S.ExpandButton
      onMouseOver={() => setHighlightIcon(true)}
      onMouseOut={() => setHighlightIcon(false)}
      onFocus={() => setHighlightIcon(true)}
      onBlur={() => setHighlightIcon(false)}
      onClick={handleClick}
      title="Expand 'other' genres"
    >
      {displayButton(props)}
    </S.ExpandButton>
  );
}
