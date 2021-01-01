import React from 'react';
import Typography from 'components/typography';

const { Title, Text } = Typography;

interface AuthorPropsInterface {
  id?: number;
  username: string;
  photoUrl: string;
  subtitle?: string;
}

const Author = ({
  id,
  username,
  photoUrl,
  subtitle,
}: AuthorPropsInterface): JSX.Element => (
  <>
    <div className="flex">
      <div
        style={{
          backgroundImage: `url(${photoUrl})`,
          minWidth: '2.5rem',
          minHeight: '2.5rem',
        }}
        className="bg-cover bg-center rounded-full"
      />
      <div className="flex flex-col justify-center ml-2">
        <Title level={5}>{username}</Title>
        {subtitle && (
          <Text type="secondary" className="text-xs whitespace-nowrap">
            {subtitle}
          </Text>
        )}
      </div>
    </div>
  </>
);

Author.defaultProps = {
  id: null,
  subtitle: '',
};

export default Author;
