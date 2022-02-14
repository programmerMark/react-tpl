import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

import ArticleEditor from '../../../../components/article-editor';

const EditArticle: FunctionComponent = () => {
  const { id: articleId } = useParams();

  return (
    <div>
      <ArticleEditor articleId={articleId} />
    </div>
  );
};

export default EditArticle;
