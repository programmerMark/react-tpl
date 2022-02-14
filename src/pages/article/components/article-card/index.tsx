import React, { FunctionComponent } from 'react';

import { formatDateToText } from '../../../../common/js/util';
import { IArticleCardProps } from '../../interface';

const ArticleCard: FunctionComponent<IArticleCardProps> = ({ article, handleClick }) => {
  return (
    <div
      className="py-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
      onClick={() => handleClick(article.id as string)}>
      <div className="px-4">
        <div className="text-gray-600 mt-2">
          <span className="text-xs my-1 pr-2 border-r border-gray-200">
            {article.authorName}
          </span>
          <span className="text-xs my-1 px-2 ">
            {formatDateToText(article.updateAt, true)}
          </span>
        </div>
        <div className="text-base text-gray-700 font-semibold my-2">{article.title}</div>
        <div className="text-xs text-gray-500 overflow-hidden break-all whitespace-nowrap overflow-ellipsis">
          {article.content}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
